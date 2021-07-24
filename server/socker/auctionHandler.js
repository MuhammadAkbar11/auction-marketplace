import Sequelize from "sequelize";
import ModelLelang from "../models/m_lelang.js";
import dayjs from "dayjs";
import verifyToken from "../utils/verifyToken.js";
import ResponseError from "../utils/responseError.js";
import ModelPenawaran from "../models/m_penawaran.js";
import convertRupiah from "../utils/convertRupiah.js";
import ModelMember from "../models/m_member.js";

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

const Op = Sequelize.Op;

export default io => {
  // check lelang yang aktif
  const checkNewAuction = async callback => {
    const getDateStartNow = await ModelLelang.findAll({
      where: {
        tgl_mulai: {
          [Op.lte]: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        status_lelang: 0,
      },
      attributes: ["id_lelang"],
    });
    const idStartAuctions = getDateStartNow.map(auc => auc.id_lelang);
    if (getDateStartNow.length !== 0) {
      await ModelLelang.update(
        { status_lelang: 1 },
        { where: { id_lelang: [...idStartAuctions] } }
      );
    }

    const getDateEnd = await ModelLelang.findAll({
      where: {
        tgl_selesai: {
          [Op.lte]: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        status_lelang: 1,
      },
      attributes: ["id_lelang"],
    });

    // console.log(get);
    const idCloseAuctions = getDateEnd.map(item => item.id_lelang);

    if (getDateEnd.length !== 0) {
      await ModelLelang.update(
        { status_lelang: 2 },
        { where: { id_lelang: [...idCloseAuctions] } }
      );
    }

    io.emit("auction:new", { status: true });
    callback && callback();
  };

  // === create new bid ===
  const sendBid = async (data, callback) => {
    let err = null;
    let isLastBid = false;
    const { token, id_lelang, id_member, nilai } = data;
    try {
      const decoded = await verifyToken(token);

      if (decoded) {
        const auction = await ModelLelang.findOne({
          where: { id_lelang },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
          },
        });

        const auctionMaxBid = auction.batas_tawaran;

        const existBids = await ModelPenawaran.findAndCountAll({
          where: {
            id_lelang: id_lelang,
          },
          order: [["tgl_tawaran", "DESC"]],
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
          },
        });

        const newBid = {
          id_lelang,
          id_member,
          nilai_tawaran: nilai,
          status_tawaran: 0,
        };

        if (existBids.count + 1 >= auctionMaxBid) {
          isLastBid = true;
          newBid.status_tawaran = 1;

          const setNewDateEnd = dayjs()
            .add(1, "hour")
            .format("YYYY-MM-DD HH:mm:ss");

          await ModelLelang.update(
            {
              status_lelang: 1,
              tgl_selesai: setNewDateEnd,
            },
            { where: { id_lelang: id_lelang } }
          );
        }

        const result = await ModelPenawaran.create(newBid);

        const currentBid = await ModelPenawaran.findOne({
          where: {
            id_tawaran: result.id_tawaran,
          },
          include: {
            model: ModelMember,
            as: "member",
            attributes: ["id_member", "nama", "username", "email"],
          },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
          },
        });

        const dateBid = dayjs(currentBid.dataValues.tgl_tawaran).format(
          "DD/MM/YYYY - HH:mm"
        );

        currentBid.setDataValue("tgl_tawaran", dateBid);

        io.to("bid-room-" + id_lelang).emit("current-bid", currentBid);

        callback &&
          callback(
            { status: true, message: "Berhasil", isLastBid, bid: currentBid },
            null
          );
      } else {
        throw new ResponseError(401, "Not Authorized, token failed", {
          type: "Authorized",
        });
      }
    } catch (error) {
      console.log(error);
      const err = {
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
      };

      callback && callback({ status: false }, err);
    }
  };

  // === Load bids by auction's id ===
  const getBids = async ({ id }, socket, callback) => {
    try {
      const getBids = await ModelPenawaran.findAll({
        where: {
          id_lelang: id,
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

      socket.join("bid-room-" + id);

      const bids = getBids.map(bid => {
        return {
          ...bid.dataValues,
          tgl_tawaran: dayjs(bid.dataValues.tgl_tawaran).format(
            "DD/MM/YYYY - HH:mm"
          ),
        };
      });

      callback &&
        callback(
          {
            status: true,
            tawaran: bids,
            tawaran_tertinggi: bids.length !== 0 ? bids[0] : null,
          },
          null
        );
    } catch (error) {
      console.log(error);
      const err = {
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
      };

      callback && callback({ status: false }, err);
    }
  };

  /*

      // const diff = dateEnded.diff(dayjs());
      // // console.log(dateEnded.diff(dayjs(), "day"), "<=== dayjs");
      // // console.log(dateEnded.diff(dayjs(), "minute"), "<=== dayjs");
      // console.log(dayjs(diff).format("DD HH:mm:ss"));


  */

  const countdownItem = ({ id }) => {
    // try {
    return ModelLelang.findOne({
      where: { id_lelang: id, status_lelang: 1 },
    }).then(auction => {
      if (!auction) {
        io.emit("set-countdown-item", null);
        return;
      }

      const dateEnd = dayjs(auction.tgl_selesai).valueOf();

      const auctionCountDown = setInterval(() => {
        const now = dayjs().valueOf();

        let countdown = dateEnd - now;

        if (countdown <= 0) {
          clearInterval(auctionCountDown);
          ModelLelang.update(
            { status_lelang: 3 },
            { where: { id_lelang: id } }
          ).then(() => {
            countdown = 0;

            io.emit("set-countdown-item", {
              isEnd: true,
              days: 0,
              hours: 0,
              minutes: 0,
              seconds: 0,
            });
          });
          return;
        }

        const days = Math.floor(countdown / _day);
        const hours = Math.floor((countdown % _day) / _hour);
        const minutes = Math.floor((countdown % _hour) / _minute);
        const seconds = Math.floor((countdown % _minute) / _second);

        io.emit("set-countdown-item", {
          isEnd: false,
          days,
          hours,
          minutes,
          seconds,
        });
      }, 1000);
    });
  };

  return { checkNewAuction, sendBid, getBids, countdownItem };
};
