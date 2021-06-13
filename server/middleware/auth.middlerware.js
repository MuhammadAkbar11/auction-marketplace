import jwt from "jsonwebtoken";
import daysJs from "dayjs";
import asyncHandler from "express-async-handler";
import ModelMember from "../models/m_member.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await ModelMember.findByPk(decoded.id);
      const role = await user.getModelRole();
      const reqUser = {
        username: user.username,
        id_member: user.id_member,
        nama: user.nama,
        email: user.email,
        no_hp: user.no_hp,
        role: role,
        tgl_dibuat: daysJs(user.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(user.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
      };

      req.user = reqUser;

      return next();
    } catch (error) {
      const errorObj = new Error();
      errorObj.statusCode = 401;
      errorObj.message = "Not Authorized, no token failed";

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

export { protect };
