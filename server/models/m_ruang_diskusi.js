import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelRuangDiskusi = sequelize.define(
  "ModelRuangDiskusi",
  {
    id_ruang: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    tableName: "tbl_ruang_diskusi",
    timestamps: false,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelRuangDiskusi;
