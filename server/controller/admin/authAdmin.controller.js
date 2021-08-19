import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import ResponseError from "../../utils/responseError.js";
import errMessageValidation from "../../utils/errMessagesValidation.js";
import ModelMember from "../../models/m_member.js";
import daysJs from "dayjs";
import generateToken, {
  generateAdminToken,
} from "../../utils/generateToken.js";
import ModelAdmin from "../../models/m_admin.js";

export const authAdminRegister = asyncHandler(async (req, res) => {
  const { username, nama, email, noHp, password, noKtp, alamat, tgl_lahir } =
    req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Validation failed", { validation: errorMsg });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newAdmin = {
      username,
      nama_admin: nama,
      email,
      no_hp: noHp,
      no_ktp: noKtp,
      alamat,
      password: hashPassword,
      tgl_lahir,
      id_role: 1,
    };
    const result = await ModelAdmin.create(newAdmin);
    res.status(201).json({
      message: "success",
      user: {
        username: result.username,
        id_admin: result.id_admin,
        nama: result.nama,
        email: result.email,
        no_hp: result.no_hp,
        alamat: result.alamat,
        tgl_lahir: result.tgl_lahir,
        token: generateAdminToken(result.id_admin),
        tgl_dibuat: daysJs(result.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(result.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
      },
    });
  } catch (error) {
    res.status(400);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const authAdminLogin = asyncHandler(async (req, res) => {
  const { idAdmin, password } = req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Validation failed", { validation: errorMsg });
  }

  try {
    const admin = await ModelAdmin.findOne({
      where: {
        id_admin: idAdmin,
      },
    });
    if (admin) {
      const doMatchPw = await bcrypt.compare(password, admin.password);

      if (doMatchPw) {
        res.status(200).json({
          status: true,
          message: "Login berhasil",
          admin: {
            username: admin.username,
            id_admin: admin.id_admin,
            nama_admin: admin.nama,
            email: admin.email,
            no_hp: admin.no_hp,
            token: generateAdminToken(admin.id_admin),
            tgl_dibuat: daysJs(admin.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
            tgl_diubah: daysJs(admin.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
          },
        });
      } else {
        res.status(400);
        throw new ResponseError(400, "Password salah");
      }
    } else {
      res.status(401);
      throw new ResponseError(400, "ID belum terdaftar");
    }
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
