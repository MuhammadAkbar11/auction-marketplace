import Sequelize from "sequelize";
import sequelize from "../configs/database.js";

const DataTypes = Sequelize.DataTypes;

const ModelRole = sequelize.define(
  "ModelRole",
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING(24),
    },
  },
  {
    tableName: "tbl_roles",
    timestamps: false,
  }
);

export default ModelRole;
