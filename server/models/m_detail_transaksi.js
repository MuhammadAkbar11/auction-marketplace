import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelDetailTransaksi = sequelize.define(
  "ModelDetailTransaksi",
  {
    id_detail_transaksi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    waktu_update: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tbl_detail_transaksi",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelDetailTransaksi;
