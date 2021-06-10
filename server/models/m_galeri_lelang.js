import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelGaleri = sequelize.define(
  "ModelGaleri",
  {
    id_galeri: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tbl_roles",
    timestamps: false,
  }
);

export default ModelGaleri;
