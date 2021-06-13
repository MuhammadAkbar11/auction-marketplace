import express from "express";
import {
  getUserProfile,
  postUpdateUserProfile,
} from "../controller/user.controllers.js";
import { protect } from "../middleware/auth.middlerware.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, postUpdateUserProfile);

export default router;
