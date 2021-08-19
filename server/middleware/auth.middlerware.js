import jwt from "jsonwebtoken";
import daysJs from "dayjs";
import asyncHandler from "express-async-handler";
import { isEmptyObj } from "../utils/checkObj.js";
import ModelMember from "../models/m_member.js";
import ModelAdmin from "../models/m_admin.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await ModelMember.findByPk(decoded.id);

      user.foto = "/uploads/member/guest.png";
      const reqUser = {
        username: user.username,
        id_member: user.id_member,
        nama: user.nama,
        email: user.email,
        no_hp: user.no_hp,
        isValidData: isEmptyObj(user.dataValues),
        tgl_dibuat: daysJs(user.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(user.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
      };

      req.user = reqUser;
      return next();
    } catch (error) {
      console.log(error);
      const errorObj = new Error();
      errorObj.statusCode = 401;
      errorObj.message = "Not Authorized, token failed";

      throw errorObj;
    }
  }

  if (!token) {
    res.status(401);
    const errorObj = new Error();
    errorObj.statusCode = 401;
    errorObj.message = "Not Authorized, no token";
    throw errorObj;
  }

  next();
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  token = authorization.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      const admin = await ModelAdmin.findByPk(decoded.id_admin);

      if (!admin) {
        const errorObj = new Error();
        errorObj.statusCode = 401;
        errorObj.message = "Not Authorized, token failed";
        errorObj.errors = {
          notAuth: true,
        };
        throw errorObj;
      }

      admin.foto = "/uploads/admin/guest.png";
      const reqAdmin = {
        username: admin.username,
        id_admin: admin.id_admin,
        nama_admin: admin.nama_admin,
        email: admin.email,
        no_hp: admin.no_hp,
        isValidData: isEmptyObj(admin.dataValues),
        tgl_dibuat: daysJs(admin.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(admin.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
      };

      req.user = reqAdmin;
      return next();
    } catch (error) {
      const errorObj = new Error();
      errorObj.statusCode = 401;
      errorObj.message = "Not Authorized, token failed";
      errorObj.errors = {
        notAuth: true,
      };
      throw errorObj;
    }
    return;
  }

  if (!token) {
    res.status(401);
    const errorObj = new Error();
    errorObj.statusCode = 401;
    errorObj.message = "Not Authorized, no token";
    errorObj.errors = {
      notAuth: true,
    };
    throw errorObj;
  }

  next();
});

export { protect, adminProtect };
