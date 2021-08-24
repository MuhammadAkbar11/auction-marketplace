import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelPesanDiskusi = sequelize.define(
  "ModelPesanDiskusi",
  {
    id_pesan: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    isi_pesan: {
      type: DataTypes.TEXT,
    },
    id_parent: {
      type: DataTypes.UUID,
    },
  },
  {
    tableName: "tbl_pesan_diskusi",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelPesanDiskusi;
