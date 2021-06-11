import { checkSchema } from "express-validator";

const loginValidation = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "E-mail belum terisi",
    },
    isEmail: {
      errorMessage: "E-mail tidak valid",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password belum terisi",
    },
  },
});

export default loginValidation;
