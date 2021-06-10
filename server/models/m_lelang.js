import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelLelang = sequelize.define(
  "ModelLelang",
  {
    id_lelang: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nama_brg: {
      type: DataTypes.STRING,
    },
    status_barang: {
      type: DataTypes.STRING,
    },
    hrg_awal: {
      type: DataTypes.STRING,
    },
    hrg_akhir: {
      type: DataTypes.STRING,
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
    },
  },
  {
    tableName: "tbl_lelang",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelLelang;
