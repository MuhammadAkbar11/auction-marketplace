import express from "express";
import {
  getUserProfile,
  postUpdateUserProfile,
  postUserCreateAuction,
  getUserAuction,
  postUserStartAuction,
} from "../controller/user.controllers.js";
import { protect } from "../middleware/auth.middlerware.js";
import { uploadFilesMiddleware } from "../middleware/uploads.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, postUpdateUserProfile);
router.get("/auction", protect, getUserAuction);
router.post(
  "/auction/create",
  protect,
  uploadFilesMiddleware,
  postUserCreateAuction
);
router.put("/auction/start", protect, postUserStartAuction);

export default router;
