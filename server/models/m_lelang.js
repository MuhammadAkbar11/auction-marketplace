import dayjs from "dayjs";
import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";
import ModelGaleri from "./m_galeri_lelang.js";

const DataTypes = Sequelize.DataTypes;

const ModelLelang = sequelize.define(
  "ModelLelang",
  {
    _id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    id_lelang: {
      type: DataTypes.STRING(11),
      primaryKey: true,
      // autoIncrement: true,
    },
    judul: {
      type: DataTypes.STRING(50),
    },
    status_brg: {
      type: DataTypes.STRING(30),
    },
    hrg_awal: {
      type: DataTypes.STRING(30),
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
    alamat_barang: {
      type: DataTypes.STRING,
    },
    jenis_pengiriman: {
      type: DataTypes.STRING(128),
    },
    dimensi_brg: {
      type: DataTypes.STRING(128),
    },
    biaya_packing: {
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "tbl_lelang",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
    hooks: {
      beforeBulkCreate: function (options) {
        options.individualHooks = true;
        return options;
      },
      beforeCreate: async function (lelang, options) {
        const datePrefix = dayjs().format("DDMMYY");
        const _id = await getAutoNumber("tbl_lelang", "_id", "", 4);
        lelang._id = _id;
        lelang.id_lelang = `${datePrefix}${_id}`;
      },
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
