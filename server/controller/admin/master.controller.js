import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import Sequelize from "sequelize";
import ResponseError from "../../utils/responseError.js";
import ModelMember from "../../models/m_member.js";
import ModelLelang from "../../models/m_lelang.js";

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
