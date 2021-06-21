import sequelize from "../configs/database.js";
import Sequelize from "sequelize";

const getAutoNumber = async (table, field, pref = "", length, where = "") => {
  const prefLength = pref.length;
  const query = `SELECT IFNULL(MAX(CONVERT(MID(${field},${prefLength + 1},${
    length - prefLength
  }), UNSIGNED INTEGER)),0)+1 AS NOMOR FROM ${table} WHERE LEFT(${field},${prefLength})='${pref}' ${where}`;
  const result = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  let zero = [];

  const num = length - +prefLength - +result[0].NOMOR?.length;
  for (let i = 0; i < num; i++) {
    zero.push("0");
  }

  return `${pref}${zero.join("")}${result[0].NOMOR}`;
};

export default getAutoNumber;
