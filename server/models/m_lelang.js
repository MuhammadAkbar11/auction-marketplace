import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import ModelGaleri from "./m_galeri_lelang.js";

const DataTypes = Sequelize.DataTypes;

const ModelLelang = sequelize.define(
  "ModelLelang",
  {
    id_lelang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING,
    },
    status_brg: {
      type: DataTypes.STRING(50),
    },
    hrg_awal: {
      type: DataTypes.STRING(128),
    },
    kelipatan_hrg: {
      type: DataTypes.STRING(20), // 20.000
    },
    batas_tawaran: {
      type: DataTypes.INTEGER,
    },
    deskripsi: {
      type: DataTypes.TEXT,
    },
    tgl_mulai: {
      type: DataTypes.DATE,
    },
    tgl_selesai: {
      type: DataTypes.DATE,
    },
    status_lelang: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "tbl_lelang",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
    hooks: {
      beforeBulkDestroy: function (options) {
        options.individualHooks = true;
        return options;
      },
      beforeDestroy: async function (lelang) {
        const id = lelang.id_lelang;
        await ModelGaleri.destroy({
          where: {
            id_lelang: id,
          },
        });
      },
    },
  }
);

export default ModelLelang;
