import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelDetailTransaksi = sequelize.define(
  "ModelDetailTransaksi",
  {
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
  const id = await getAutoNumber(
    "tbl_detail_transaksi",
    "id_detail_transaksi",
    prefix,
    12
  );
  invoice.id_detail_transaksi = id;
});

export default ModelDetailTransaksi;
