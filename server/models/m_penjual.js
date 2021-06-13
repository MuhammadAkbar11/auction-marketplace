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
  },
  { tableName: "tbl_penjual" }
);

export default ModelPenjual;
