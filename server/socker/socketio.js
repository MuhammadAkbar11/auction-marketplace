import dayjs from "dayjs";
import { Server as SocketServer } from "socket.io";
import ModelLelang from "../models/m_lelang.js";
import ResponseError from "../utils/responseError.js";
import registerAuctionHandler from "./auctionHandler.js";

const SocketApp = server => {
  const io = new SocketServer(server, {
    cors: true,
    origins: ["http://localhost:3000"],
  });

  const { checkNewAuction, sendBid, getBids, countdownItem } =
    registerAuctionHandler(io);

  const onConnection = socket => {
    console.log("socket connected");
    socket.on("auction:start", checkNewAuction);
    socket.on("send-bid", sendBid);
    socket.on("get-bids", ({ id }, callback) =>
      getBids({ id }, socket, callback)
    );

    // broadcast timer
    socket.on("get-countdown-item", ({ id }, callback) => {
      ModelLelang.findOne({
        where: { id_lelang: id },
      })
        .then(result => {
          if (!result) {
            throw new ResponseError(401, "Lelang tidak dapat di temukan");
          }

          socket.join(result.id_lelang);

          const dateEnded = dayjs(result.tgl_selesai).valueOf();

          const _second = 1000;
          const _minute = _second * 60;
          const _hour = _minute * 60;
          const _day = _hour * 24;

          const interval = setInterval(() => {
            const currentTime = dayjs().valueOf();

            let countdown = dateEnded - currentTime;

            const days = Math.floor(countdown / _day);
            const hours = Math.floor((countdown % _day) / _hour);
            const minutes = Math.floor((countdown % _hour) / _minute);
            const seconds = Math.floor((countdown % _minute) / _second);

            const data = {
              isEnded: false,
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: seconds,
              dateServer: dayjs().format("DD/MM/YYYY - HH:mm:ss"),
            };

            if (countdown <= 0) {
              clearInterval(interval);
              ModelLelang.update(
                { status_lelang: 2 },
                { where: { id_lelang: id } }
              ).then(() => {
                countdown = 0;

                io.emit("set-countdown-item", {
                  isEnded: true,
                  days: 0,
                  hours: 0,
                  minutes: 0,
                  seconds: 0,
                });
              });
              return;
            }

            socket.broadcast
              .to(result.id_lelang)
              .emit("set-countdown-item", data);
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          callback && callback("Gagal");
        });
    });
  };

  io.on("connection", onConnection);
};

export default SocketApp;
