import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelPenawaran = sequelize.define(
  "ModelPenawaran",
  {
    id_tawaran: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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

export default ModelPenawaran;
