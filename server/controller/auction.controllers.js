import asyncHandler from "express-async-handler";
import multer from "multer";
import dayjs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelLelang from "../models/m_lelang.js";
import ModelGaleri from "../models/m_galeri_lelang.js";
import sequelize from "sequelize";
import ModelPenawaran from "../models/m_penawaran.js";
import ModelMember from "../models/m_member.js";

const Op = sequelize.Op;

export const getListAuction = asyncHandler(async (req, res) => {
  const latest = req.query.latest;

  let order = [];

  if (latest === "true") {
    order.push(["tgl_mulai", "ASC"]);
  } else {
    order.push(["judul", "ASC"]);
  }

  try {
    const listAuction = await ModelLelang.findAll({
      where: {
        tgl_mulai: {
          [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
      order: order,
    });

    // clg

    await Promise.all(
      listAuction.map(async auction => {
        const auctionData = auction.dataValues;
        const auctionId = auctionData.id_lelang;
        const kategori = await auction.getModelKategori();
        const images = await ModelGaleri.findAll({
          where: {
            id_lelang: auctionId,
          },
          attributes: {
            exclude: ["ModelLelangIdLelang"],
          },
        });

        const tawaran = await ModelPenawaran.findAll({
          where: {
            id_lelang: auctionId,
          },
          order: [["tgl_tawaran", "DESC"]],
          include: {
            model: ModelMember,
            as: "member",
            attributes: ["id_member", "nama", "username", "email"],
          },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
            // include: ["id_member", "nama", "username", "email"],
          },
        });

        auctionData.tgl_mulai = dayjs(auctionData.tgl_mulai).format(
          "D MMM, YYYY - HH:mm"
        );
        auctionData.tgl_selesai = dayjs(auctionData.tgl_selesai).format(
          "D MMM, YYYY - HH:mm"
        );
        auctionData.gambar = images;
        auctionData.kategori = kategori;
        auctionData.tawaran =
          tawaran.length !== 0
            ? tawaran.map(bid => {
                const bidData = bid.dataValues;
                return {
                  ...bidData,
                  tgl_tawaran: dayjs(bidData.tgl_tawaran).format(
                    "DD/MM/YYYY - HH:mm"
                  ),
                  // member: await bid.getModelMember(),
                };
              })
            : tawaran;

        return auctionData;
      })
    );

    // const transformList = { ...listAuction };

    res.status(200).json({
      status: true,
      lelang: listAuction,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getAuction = asyncHandler(async (req, res) => {
  const auctionId = req.params.auctionId;

  try {
    const auction = await ModelLelang.findOne({
      where: { id_lelang: auctionId },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
    });

    if (auction) {
      const images = await ModelGaleri.findAll({
        where: { id_lelang: auctionId },
        attributes: {
          exclude: ["ModelLelangIdLelang"],
        },
      });
      const kategori = await auction.getModelKategori();
      const bids = await ModelPenawaran.findAll({
        where: {
          id_lelang: auctionId,
        },
        order: [["tgl_tawaran", "DESC"]],
        include: {
          model: ModelMember,
          as: "member",
          attributes: ["id_member", "nama", "username", "email"],
        },
        attributes: {
          exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
          // include: ["id_member", "nama", "username", "email"],
        },
      });

      const currentBid = bids[0];

      const dateEnd = dayjs(auction.tgl_selesai);
      const dateStart = dayjs(auction.tgl_mulai);
      const duration = dateEnd.diff(dateStart, "day");
      const timeStart = dateStart.format("HH:mm");

      auction.setDataValue("durasi", duration);
      auction.setDataValue("gambar", images);
      auction.setDataValue("kategori", kategori.kategori);
      auction.setDataValue("jam_mulai", timeStart);
      auction.setDataValue("tawaran", bids);
      auction.setDataValue("tawaran_saat_ini", currentBid);
      auction.setDataValue(
        "tgl_selesai",
        dayjs(auction.tgl_selesai).format("D MMM, YYYY - HH:mm")
      );
      return res.status(200).json({
        status: true,
        lelang: auction,
      });
    }
    res.status(200).json({
      status: true,
      lelang: null,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
