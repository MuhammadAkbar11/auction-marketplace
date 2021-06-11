import express from "express";
import {
  authLogin,
  authRegister,
} from "../controller/auth/auth.controllers.js";
import loginValidation from "../middleware/validations/login.validation.js";
import registerValidation from "../middleware/validations/register.validation.js";

const router = express.Router();

router.post("/register", [registerValidation], authRegister);

router.post("/login", [loginValidation], authLogin);

export default router;
