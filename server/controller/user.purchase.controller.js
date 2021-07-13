import asyncHandler from "express-async-handler";
import ModelLelang from "../models/m_lelang.js";
import ModelMember from "../models/m_member.js";
import ModelPenawaran from "../models/m_penawaran.js";
import ResponseError from "../utils/responseError.js";
import Sequelize from "sequelize";
import dayjs from "dayjs";

export const getUserBids = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id_member;
    const userListBid = await ModelPenawaran.findAll({
      where: {
        id_member: userId,
      },
      attributes: {
        exclude: ["ModelLelangIdLelang", "ModelMemberIdMember"],
      },
    });

    const seen = new Set();

    const auctionId = userListBid
      .filter(el => {
        const duplicate = seen.has(el.id_lelang);
        seen.add(el.id_lelang);
        return !duplicate;
      })
      .filter(el => el.id_lelang !== null)
      .map(bid => bid.id_lelang);

    const auctions = await ModelLelang.findAll({
      where: {
        id_lelang: auctionId,
      },
      attributes: [
        "id_lelang",
        "judul",
        "status_lelang",
        "tgl_mulai",
        "tgl_selesai",
      ],
    });

    await Promise.all(
      auctions.map(async item => {
        const auctionData = item.dataValues;
        const auctionId = auctionData.id_lelang;
        const listBid = await ModelPenawaran.findAll({
          where: {
            id_lelang: auctionId,
          },
          order: [["nilai_tawaran", "DESC"]],
          include: {
            model: ModelMember,
            as: "member",
            attributes: ["id_member", "nama", "username", "email"],
          },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
          },
        });

        const valueOfDateEnd = dayjs(auctionData.tgl_selesai).valueOf();
        const valueOfCurrentTime = dayjs().valueOf();

        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;

        let countdown = valueOfDateEnd - valueOfCurrentTime;

        const days = Math.floor(countdown / _day);
        const hours = Math.floor((countdown % _day) / _hour);
        const minutes = Math.floor((countdown % _hour) / _minute);
        const seconds = Math.floor((countdown % _minute) / _second);

        auctionData.berakhir_dalam = `${days}h ${hours}j ${minutes}m ${seconds}d`;

        auctionData.tgl_selesai = dayjs(auctionData.tgl_selesai).format(
          " DD/MM/YYYY - HH:mm"
        );

        if (countdown <= 0) {
          auctionData.berakhir_dalam = `Telah selesai`;
        }

        auctionData.tawaran = listBid;
        auctionData.tawaran_saya = listBid.filter(b => b.id_member === userId);
        return auctionData;
      })
    );

    res.status(200).json({
      status: true,
      myBids: auctions,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
