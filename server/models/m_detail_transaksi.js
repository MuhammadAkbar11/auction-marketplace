import Sequelize from "sequelize";
import dayjs from "dayjs";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelDetailTransaksi = sequelize.define(
  "ModelDetailTransaksi",
  {
    _id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    id_detail_transaksi: {
      type: DataTypes.STRING(12),
      // autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    waktu_update: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "tbl_detail_transaksi",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

ModelDetailTransaksi.beforeBulkCreate(options => {
  options.individualHooks = true;
  return options;
});

ModelDetailTransaksi.beforeCreate(async (invoice, options) => {
  const prefix = "INV" + dayjs().format("DDMMYY");
  const _id = await getAutoNumber("tbl_detail_transaksi", "_id", "", 3);
  invoice._id = _id;
  invoice.id_detail_transaksi = `${prefix}${_id}`;
});

export default ModelDetailTransaksi;
