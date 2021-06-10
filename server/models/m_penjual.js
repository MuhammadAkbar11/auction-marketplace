import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelPenjual = sequelize.define(
  "ModelPenjual",
  {
    id_penjual: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    no_ktp: {
      type: DataTypes.STRING(16),
    },
    id_provinsi: {
      type: DataTypes.INTEGER,
    },
    id_kota: {
      type: DataTypes.INTEGER,
    },
    id_kecamatan: {
      type: DataTypes.INTEGER,
    },
    id_kelurahan: {
      type: DataTypes.INTEGER,
    },
    tgl_lahir: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "tbl_penjual" }
);

export default ModelPenjual;
