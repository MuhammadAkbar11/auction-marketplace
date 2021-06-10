import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelMember = sequelize.define(
  "ModelMember",
  {
    id_member: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    nama: {
      type: DataTypes.STRING(128),
    },
    username: {
      type: DataTypes.STRING(128),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.TEXT,
    },
    kode_pos: {
      type: DataTypes.STRING(10),
    },
    no_hp: {
      type: DataTypes.STRING(15),
    },
    foto: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tbl_member",
    timestamps: true,
    createdAt: "tgl_dibuat",
    updatedAt: "tgl_diubah",
  }
);

export default ModelMember;
