import dayjs from "dayjs";
import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelPenawaran = sequelize.define(
  "ModelPenawaran",
  {
    id_tawaran: {
      type: DataTypes.STRING(12),
      primaryKey: true,
    },
    status_tawaran: {
      type: DataTypes.INTEGER,
    },
    nilai_tawaran: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tbl_tawaran",
    timestamps: true,
    createdAt: "tgl_tawaran",
    updatedAt: false,
  }
);

ModelPenawaran.beforeBulkCreate(options => {
  options.individualHooks = true;
  return options;
});

ModelPenawaran.beforeCreate(async (bid, options) => {
  const prefix = "BID" + dayjs().format("DDMMYY");
  const id = await getAutoNumber("tbl_tawaran", "id_tawaran", prefix, 12);
  bid.id_tawaran = id;
});

export default ModelPenawaran;
