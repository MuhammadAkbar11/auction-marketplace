import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelAkunBank = sequelize.define(
  "ModelAkunBank",
  {
    id_akun: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    no_rek: {
      type: DataTypes.STRING(25),
    },
    nama_rek: {
      type: DataTypes.STRING(50),
    },
    nama_bank: {
      type: DataTypes.STRING(25),
    },
  },
  { tableName: "tbl_akun_bank", timestamps: false }
);

export default ModelAkunBank;
