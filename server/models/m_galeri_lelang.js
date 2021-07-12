import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import { deleteFile } from "../utils/file.js";

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
    tableName: "tbl_galeri_lelang",
    timestamps: false,
    hooks: {
      beforeBulkDestroy: function (options) {
        options.individualHooks = true;
        return options;
      },
      beforeDestroy: async function (galeri) {
        const url = galeri.url;
        deleteFile(url);
      },
    },
  }
);

export default ModelGaleri;
