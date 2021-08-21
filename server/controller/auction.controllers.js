import asyncHandler from "express-async-handler";
import multer from "multer";
import dayjs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelLelang from "../models/m_lelang.js";
import ModelGaleri from "../models/m_galeri_lelang.js";
import sequelize from "sequelize";
import ModelPenawaran from "../models/m_penawaran.js";
import ModelMember from "../models/m_member.js";
import ModelKategori from "../models/m_kategori.js";

const Op = sequelize.Op;

export const getListAuction = asyncHandler(async (req, res) => {
  let filterBy = req.body.filter; // all, active, latest, endSoon,
  let sortBy = req.body.sort || "_id";
  let orderBy = req.body.order || "DESC";
  let skip = +req.body.skip || 0;
  let limit = +req.body.result || 8;

  // for category
  let categoryId = req.body.categoryId || [];
  let slug = req.body.slug || null;

  let order = [];

  let where = {
    tgl_mulai: {
      [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
    status_lelang: {
      [Op.in]: [1, 2, 3],
    },
  };

  let categoryData = null;

  switch (filterBy) {
    case "all":
      where = {
        tgl_mulai: {
          [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        status_lelang: {
          [Op.in]: [1, 2, 3],
        },
      };
      order.push(["_id", "ASC"]);
      break;
    case "active":
      where = {
        tgl_mulai: {
          [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        status_lelang: {
          [Op.in]: [1],
        },
      };
      order.push(["tgl_mulai", "ASC"]);
      break;
    case "latest":
      where = {
        tgl_mulai: {
          [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          [Op.gte]: dayjs().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss"),
        },
        status_lelang: {
          [Op.in]: [1, 2, 3],
        },
      };
      order.push(["tgl_mulai", "DESC"]);
      break;
    case "endSoon":
      where = {
        tgl_mulai: {
          [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        status_lelang: {
          [Op.in]: [1],
        },
      };
      order.push(["tgl_selesai", "ASC"]);
      break;
    default:
      order.push([sortBy, orderBy]);
      break;
  }

  if (slug) {
    const getCategory = await ModelKategori.findOne({
      where: {
        slug: slug,
      },
    });
    categoryData = getCategory;
    categoryId = [getCategory.id_kategori];
  }

  if (categoryId) {
    if (categoryId.length !== 0) {
      where.id_kategori = {
        [Op.in]: categoryId,
      };
    }
  }

  try {
    const listAuction = await ModelLelang.findAll({
      where,
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
      order: order,
      sortBy,
      limit,
      offset: skip,
    });

    const totalAuction = await ModelLelang.count({ where });

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

        auctionData.telah_selesai =
          dayjs(auctionData.tgl_selesai).valueOf() <= dayjs().valueOf();

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

    const filterConfig = {
      filterBy: req.body.filter,
      order: order,
      limit,
      categoryId,
      offset: skip,
    };

    res.status(200).json({
      status: true,
      config: filterConfig,
      totalItem: totalAuction,
      lelang: listAuction,
      kategori: categoryData,
      filter: req.body,
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
      let isOver = false;
      const diffNowAndDateEnd = dateEnd.valueOf() - dayjs().valueOf();

      if (diffNowAndDateEnd <= 0) {
        isOver = true;
      }
      // console.log();

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
      auction.setDataValue("telah_berakhir", isOver);
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

export const getAuctionByCategory = asyncHandler(async (req, res) => {});
