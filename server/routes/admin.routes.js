import express from "express";
import {
  authAdminRegister,
  authAdminLogin,
} from "../controller/admin/authAdmin.controller.js";

const router = express.Router();

router.post("/register", authAdminRegister);

router.post("/login", authAdminLogin);

export default router;
