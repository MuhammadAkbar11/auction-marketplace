import jwt from "jsonwebtoken";
import ModelMember from "../models/m_member.js";

export default async token => {
  let user = null;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const getUser = await ModelMember.findByPk(decoded.id);

      user = getUser.dataValues;
      return user;
    } catch (error) {
      user = null;
    }
  }

  if (!token) {
    user = null;
  }

  return user;
};
