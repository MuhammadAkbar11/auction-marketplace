import express from "express";
import {
  getUserProfile,
  postUpdateUserProfile,
  postUserCreateAuction,
  getUserAuction,
  postUserStartAuction,
  getIsValidData,
  putUserUpdateAuction,
  getAuctionDetails,
  postDeleteAuction,
  postCloseAuction,
} from "../controller/user.controllers.js";
import { getUserBids } from "../controller/user.purchase.controller.js";
import { protect } from "../middleware/auth.middlerware.js";
import { uploadFilesMiddleware } from "../middleware/uploads.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, postUpdateUserProfile);
router.get("/check-valid-data", protect, getIsValidData);
router.get("/auction", protect, getUserAuction);
router.post(
  "/auction/create",
  protect,
  uploadFilesMiddleware,
  postUserCreateAuction
);
router.put(
  "/auction/update",
  protect,
  uploadFilesMiddleware,
  putUserUpdateAuction
);
router.put("/auction/start", protect, postUserStartAuction);
router.get("/auction/:auctionId", protect, getAuctionDetails);
router.delete("/auction/:auctionId", protect, postDeleteAuction);
router.get("/auction/close/:auctionId", protect, postCloseAuction);

router.get("/mybids", protect, getUserBids);

export default router;
