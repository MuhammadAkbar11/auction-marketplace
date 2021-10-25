import asyncHandler from "express-async-handler";
import Sequelize from "sequelize";
import ModelLelang from "../models/m_lelang.js";
import ModelPenawaran from "../models/m_penawaran.js";
import ModelTransaksi from "../models/m_transaksi.js";
import ResponseError from "../utils/responseError.js";

const Op = Sequelize.Op;

export const getUserDashAuctions = asyncHandler(async (req, res) => {
  const idMember = req.user.id_member;
  try {
    let data = {};

    data.all = await ModelLelang.findAndCountAll({
      where: {
        id_member: idMember,
      },
    });

    data.active = await ModelLelang.findAndCountAll({
      where: {
        id_member: idMember,
        status_lelang: 1,
      },
    });

    const soldItems = await ModelLelang.findAll({
      where: {
        id_member: idMember,
        status_lelang: {
          [Op.in]: [3, 4, 5],
        },
      },
    });

    let rowsSoldItems = [];

    if (soldItems.length !== 0) {
      rowsSoldItems = await Promise.all(
        soldItems.map(async auction => {
          const auctionData = auction.dataValues;
          const auctionId = auctionData.id_lelang;

          const bids = await ModelPenawaran.findAll({
            where: {
              id_lelang: auctionId,
            },
            order: [["tgl_tawaran", "DESC"]],
            attributes: {
              exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
            },
          });

          const transaction = await ModelTransaksi.findOne({
            where: {
              id_tawaran: bids[0]?.id_tawaran,
              status_transaksi: {
                [Op.in]: [4, 5],
              },
            },
            attributes: {
              exclude: ["ModelPenawaranIdTawaran"],
            },
          });

          if (transaction.length !== 0) {
            return {
              ...auctionData,
              ...transaction.dataValues,
            };
          }

          return [];
        })
      );
    }

    const soldOutAuctions = {
      count: rowsSoldItems.length,
      rows: rowsSoldItems,
    };

    data.sold_out = soldOutAuctions;

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
