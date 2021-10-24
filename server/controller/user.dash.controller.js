import asyncHandler from "express-async-handler";
import Sequelize from "sequelize";
import ModelLelang from "../models/m_lelang.js";
import ModelMember from "../models/m_member.js";
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

    data.sold_out = await ModelLelang.findAndCountAll({
      where: {
        id_member: idMember,
        status_lelang: {
          [Op.in]: [4, 5],
        },
      },
    });

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
