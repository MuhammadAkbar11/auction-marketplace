import dayjs from "dayjs";
import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelTransaksi = sequelize.define(
  "ModelTransaksi",
  {
    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
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
    ongkir: {
      type: DataTypes.STRING(128),
    },
    jenis_pengiriman: {
      type: DataTypes.STRING(128),
    },
  },
  {
    tableName: "tbl_transaksi",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

ModelTransaksi.beforeBulkCreate(options => {
  options.individualHooks = true;
  return options;
});

ModelTransaksi.beforeCreate(async (transaksi, options) => {
  const prefix = dayjs().format("DDMMYY");
  const id = await getAutoNumber("tbl_transaksi", "id_transaksi", prefix, 9);
  transaksi.id_transaksi = +id;
});

export default ModelTransaksi;
