import Sequelize from "sequelize";
import sequelize from "../configs/database.js";
import getAutoNumber from "../utils/getAutoNumber.js";

const DataTypes = Sequelize.DataTypes;

const ModelAdmin = sequelize.define(
  "ModelAdmin",
  {
    id_admin: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    nama_admin: {
      type: DataTypes.STRING(128),
    },
    username: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    no_hp: {
      type: DataTypes.STRING(20),
    },
    no_ktp: {
      type: DataTypes.STRING(16),
    },
    tgl_lahir: {
      type: DataTypes.DATEONLY,
    },
    foto: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tbl_admin",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

ModelAdmin.beforeCreate(async (member, option) => {
  const id = await getAutoNumber("tbl_admin", "id_admin", "ADM", 6);
  member.id_admin = id;
});

export default ModelAdmin;
