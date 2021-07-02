import { checkSchema } from "express-validator";
import ModelMember from "../../models/m_member.js";

const registerValidation = checkSchema({
  username: {
    trim: true,
    notEmpty: {
      errorMessage: "Username belum terisi",
    },
    isLength: {
      errorMessage: "Username harus lebih dari 6 karakter",
      options: {
        min: 6,
      },
    },
    custom: {
      options: async (value, { req, location, path }) => {
        const isExist = await ModelMember.findOne({
          where: { username: value },
        });
        if (isExist) {
          throw new Error("Username sudah tersedia!");
        }
        return true;
      },
    },
  },
  nama: {
    trim: true,
    notEmpty: {
      errorMessage: "Nama Belum terisi",
    },
  },
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Alamat E-mail belum terisi",
    },
    normalizeEmail: true,
    isEmail: {
      errorMessage: "Alamat E-mail tidak valid",
    },
    custom: {
      options: async (value, { req, location, path }) => {
        const isExist = await ModelMember.findOne({
          where: { email: value },
        });

        if (isExist) {
          throw new Error("E-mail sudah terdaftar!");
        }
        return true;
      },
    },
  },
  noHp: {
    trim: true,
    notEmpty: {
      errorMessage: "Nomor telepon belum terisi",
    },
  },
  password: {
    trim: true,
    notEmpty: {
      errorMessage: "Password belum terisi",
    },
    isLength: {
      errorMessage: "Password harus lebih dari 6 karakter",
      options: {
        min: 5,
      },
    },
  },
  // password2: {
  //   trim: true,
  //   notEmpty: {
  //     errorMessage: "Enter confirm password",
  //   },
  //   custom: {
  //     options: (value, { req, location, path }) => {
  //       if (value !== req.body.password) {
  //         throw new Error("Password have to match!");
  //       }
  //       return true;
  //     },
  //   },
  // },
});

export default registerValidation;
