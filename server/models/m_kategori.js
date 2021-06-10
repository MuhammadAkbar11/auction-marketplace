import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelKategori = sequelize.define(
  "ModelKategori",
  {
    id_kategori: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kategori: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "tbl_kategori", timestamps: false }
);

export default ModelKategori;
