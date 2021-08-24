import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import Sequelize from "sequelize";
import ResponseError from "../../utils/responseError.js";
import ModelMember from "../../models/m_member.js";
import ModelLelang from "../../models/m_lelang.js";
import ModelPenawaran from "../../models/m_penawaran.js";

const Op = Sequelize.Op;

export const getMembers = asyncHandler(async (req, res) => {
  let members = [];

  try {
    const getMembers = await ModelMember.findAll({});

    members = await Promise.all(
      getMembers.map(async unit => {
        const member = unit.dataValues;

        const totalMemberAuctions = await ModelLelang.findAndCountAll({
          where: {
            id_member: member.id_member,
          },
          tgl_mulai: {
            [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
          // status_lelang: {
          //   [Op.in]: [1],
          // },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
          },
        });

        return {
          ...member,
          total_lelang: totalMemberAuctions,
        };
      })
    );
    console.log(members);

    return res.status(200).json({
      status: true,
      members,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getMemberDetails = asyncHandler(async (req, res) => {
  try {
    const member = await ModelMember.findOne({
      where: { id_member: req.params.memberId },
    });

    const memberTotalAuction = await ModelLelang.findAndCountAll();

    member.setDataValue("total_lelang", memberTotalAuction);

    return res.status(200).json({
      status: true,
      member,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const adminGetAuctions = asyncHandler(async (req, res) => {
  try {
    let auctions = [];

    const getAuctions = await ModelLelang.findAll({
      where: {},
      tgl_mulai: {
        [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
    });

    if (getAuctions.length !== 0) {
      auctions = await Promise.all(
        getAuctions.map(async auction => {
          const auctionData = auction.dataValues;
          const auctionId = auctionData.id_lelang;
          const seller = await ModelMember.findOne({
            where: {
              id_member: auction.id_member,
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
            },
          });

          const bidArr =
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

          return {
            ...auctionData,
            penjual: seller,
            tgl_mulai: dayjs(auctionData.tgl_mulai).format(
              "DD/MM/YYYY - HH:mm"
            ),
            tgl_selesai: dayjs(auctionData.tgl_selesai).format(
              "DD/MM/YYYY - HH:mm"
            ),
            tawaran: bidArr,
          };
        })
      );
    }
    res.status(200).json({
      status: true,
      auctions: auctions,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
