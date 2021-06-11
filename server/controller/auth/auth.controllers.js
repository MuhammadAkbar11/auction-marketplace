import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import ResponseError from "../../utils/responseError.js";
import errMessageValidation from "../../utils/errMessagesValidation.js";
import ModelMember from "../../models/m_member.js";
import daysJs from "dayjs";
import generateToken from "../../utils/generateToken.js";

export const authRegister = asyncHandler(async (req, res) => {
  const { username, nama, email, noTelp, password } = req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Validation failed", { validation: errorMsg });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newMember = {
      username,
      nama,
      email,
      no_hp: noTelp,
      password: hashPassword,
      id_role: 2,
    };
    await ModelMember.create(newMember);
    res.status(201).json({
      message: "success",
      member: newMember,
    });
  } catch (error) {
    res.status(400);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  const errorMsg = errMessageValidation(errors.array());

  if (!errors.isEmpty()) {
    res.statusCode = 400;
    throw new ResponseError(400, "Validation failed", { validation: errorMsg });
  }

  try {
    const member = await ModelMember.findOne({
      where: {
        email: email,
      },
    });
    if (member) {
      const doMatchPw = await bcrypt.compare(password, member.password);

      if (doMatchPw) {
        const role = await member.getModelRole();

        res.status(200).json({
          message: "Login berhasil",
          member: {
            username: member.username,
            id_member: member.id_member,
            nama: member.nama,
            email: member.email,
            no_hp: member.no_hp,
            role: role,

            token: generateToken(member.id_member),
            tgl_dibuat: daysJs(member.tgl_dibuat).format(
              "DD MMM, YYYY - HH.mm"
            ),
            tgl_diubah: daysJs(member.tgl_diubah).format(
              "DD MMM, YYYY - HH.mm"
            ),
          },
        });
      } else {
        res.status(400);
        throw new ResponseError(400, "Password salah");
      }
    } else {
      res.status(401);
      throw new ResponseError(400, "Email belum terdaftar");
    }
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
