import dotenv from "dotenv";
import Sequelize from "sequelize";
import EnvFile from "./envfile.js";

dotenv.config({
  path: EnvFile,
});

const Database = Sequelize.Sequelize;

const sequelize = new Database(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    timezone: "+07:00",
  }
);

export default sequelize;
