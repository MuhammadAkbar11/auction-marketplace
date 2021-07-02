import Sequelize from "sequelize";
import ModelLelang from "../models/m_lelang.js";
import dayjs from "dayjs";

const Op = Sequelize.Op;

export default io => {
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
    const idAuctions = getDateStartNow.map(auc => auc.id_lelang);
    if (getDateStartNow.length !== 0) {
      await ModelLelang.update(
        { status_lelang: 1 },
        { where: { id_lelang: [...idAuctions] } }
      );
    }

    io.emit("auction:new", { status: true });
    callback && callback();
  };

  return { checkNewAuction };
};

// export default registerAuctionHandler;
