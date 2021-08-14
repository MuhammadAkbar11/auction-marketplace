import dayjs from "dayjs";
import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelTransaksi = sequelize.define(
  "ModelTransaksi",
  {
    _id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    id_transaksi: {
      type: DataTypes.STRING(11),
      primaryKey: true,
      unique: true,
    },
    nama_penerima: {
      type: DataTypes.STRING(50),
    },
    nohp_penerima: {
      type: DataTypes.STRING(20),
    },
    alamat_tujuan: {
      type: DataTypes.TEXT,
    },
    total_harga: {
      type: DataTypes.STRING(20),
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
    batas_waktu_bayar: {
      type: DataTypes.DATE,
    },
    jenis_pengiriman: {
      type: DataTypes.STRING(30),
    },
    ongkir: {
      type: DataTypes.STRING(20),
    },
    status_transaksi: {
      type: DataTypes.STRING,
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
  const datePrefix = dayjs().format("DDMMYY");
  const _id = await getAutoNumber("tbl_transaksi", "_id", "", 4);
  transaksi._id = +_id;
  transaksi.id_transaksi = `${datePrefix}${_id}`;
});

export default ModelTransaksi;
