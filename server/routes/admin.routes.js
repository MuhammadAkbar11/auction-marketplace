import express from "express";
import {
  authAdminRegister,
  authAdminLogin,
} from "../controller/admin/authAdmin.controller.js";
import {
  getMembers,
  getMemberDetails,
} from "../controller/admin/master.controller.js";
import {
  getCategories,
  postCategory,
  deleteCategory,
} from "../controller/category.controller.js";
import { adminProtect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.post("/register", authAdminRegister);
router.post("/login", authAdminLogin);
router.get("/kategori", adminProtect, getCategories);
router.post("/kategori", adminProtect, postCategory);
router.delete("/kategori/:categoryId", adminProtect, deleteCategory);
router.get("/members", adminProtect, getMembers);
router.get("/members/:memberId", adminProtect, getMemberDetails);

export default router;
