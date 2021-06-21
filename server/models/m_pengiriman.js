import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelPengiriman = sequelize.define(
  "ModelPengiriman",
  {
    id_pengiriman: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    tgl_dikirim: {
      type: DataTypes.DATE,
    },
    tgl_diterima: {
      type: DataTypes.DATE,
    },
    no_resi: {
      type: DataTypes.STRING,
    },
    ongkir: {
      type: DataTypes.STRING(128),
    },
  },
  {
    tableName: "tbl_pengiriman",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelPengiriman;
