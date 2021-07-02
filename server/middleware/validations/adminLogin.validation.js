import { checkSchema } from "express-validator";

const adminloginValidation = checkSchema({
  id_admin: {
    notEmpty: {
      errorMessage: "ID belum terisi",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password belum terisi",
    },
  },
});

export default adminloginValidation;
