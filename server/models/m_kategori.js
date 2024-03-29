import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelKategori = sequelize.define(
  "ModelKategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING(128),
    },
    kategori: {
      type: DataTypes.STRING(128),
    },
  },
  { tableName: "tbl_kategori", timestamps: false }
);

export default ModelKategori;
