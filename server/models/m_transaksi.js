import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelTransaksi = sequelize.define(
  "ModelTransaksi",
  {
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_hrg: {
      type: DataTypes.STRING(128),
    },
    nama_penerima: {
      type: DataTypes.STRING(128),
    },
    provinsi_tujuan: {
      type: DataTypes.STRING(128),
    },
    kota_tujuan: {
      type: DataTypes.STRING(128),
    },
    alamat_tujuan: {
      type: DataTypes.TEXT,
    },
    nohp_penerima: {
      type: DataTypes.STRING(25), // 20.000
    },
    status_bayar: {
      type: DataTypes.INTEGER,
    },
    tgl_bayar: {
      type: DataTypes.DATE,
    },
    bukti_transfer: {
      type: DataTypes.STRING,
    },
    status_bayar: {
      type: DataTypes.STRING(11),
    },
    batas_waktu_bayar: {
      type: DataTypes.DATE,
    },
    layanan_pengiriman: {
      type: DataTypes.STRING(25),
    },
  },
  {
    tableName: "tbl_transaksi",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelTransaksi;
