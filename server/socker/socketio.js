import { Server as SocketServer } from "socket.io";
import registerAuctionHandler from "./auctionHandler.js";

const SocketApp = server => {
  const io = new SocketServer(server, {
    cors: true,
    origins: ["http://localhost:3000"],
  });

  const { checkNewAuction } = registerAuctionHandler(io);

  const onConnection = socket => {
    console.log("connect");
    socket.on("auction:start", checkNewAuction);
  };

  io.on("connection", onConnection);
};

export default SocketApp;
