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
  postConfirmBid,
  getUserSoldItemDetails,
  postSellerConfirmBill,
  postUserCreateBankAccount,
  deleteUserBankAccont,
  getCustomerPaymentDetails,
  postConfirmCustomerPayment,
  postUserChagePassword,
  postUserUploadPhoto,
  getCustomerShippingDetails,
  postConfirmShipping,
} from "../controller/user.controllers.js";
import { getUserDashAuctions } from "../controller/user.dash.controller.js";
import {
  getTrackShipping,
  getUserBids,
  getUserDetailsAuctionWin,
  getUserPaymentDetails,
  getUserWinAuction,
  postUserPayment,
  postUserWinConfirmAuction,
} from "../controller/user.purchase.controller.js";
import { protect } from "../middleware/auth.middlerware.js";
import { uploadMemberPhotoMiddleware } from "../middleware/uploadMemberPhoto.js";
import { uploadPaymentProofMiddleware } from "../middleware/uploadPaymentProof.js";
import { uploadFilesMiddleware } from "../middleware/uploads.js";

const router = express.Router();

router.get("/dashboard/auctions", protect, getUserDashAuctions);

router.get("/profile", protect, getUserProfile);
router.put("/update-profile", protect, postUpdateUserProfile);
router.post("/change-password", protect, postUserChagePassword);
router.post(
  "/upload-photo",
  protect,
  uploadMemberPhotoMiddleware,
  postUserUploadPhoto
);
router.get("/check-valid-data", protect, getIsValidData);
router.post("/create-account-bank", protect, postUserCreateBankAccount);
router.post("/delete-account-bank", protect, deleteUserBankAccont);
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

router.get("/auction/sold-items/:invoiceId", protect, getUserSoldItemDetails);
router.put("/auction/start", protect, postUserStartAuction);
router.get("/auction/:auctionId", protect, getAuctionDetails);
router.delete("/auction/:auctionId", protect, postDeleteAuction);
router.get("/auction/close/:auctionId", protect, postCloseAuction);
router.post("/auction/confirm-bid", protect, postConfirmBid);
router.post("/auction/confirm-auction-bill", protect, postSellerConfirmBill);
router.get("/auction/payment/:invoiceId", protect, getCustomerPaymentDetails);
router.post("/auction/payment", protect, postConfirmCustomerPayment);
router.get("/auction/shipping/:id", protect, getCustomerShippingDetails);
router.post("/auction/shipping", protect, postConfirmShipping);

router.get("/mybids", protect, getUserBids);
router.get("/winning-auction", protect, getUserWinAuction);
router.get("/winning-auction/:invoiceId", protect, getUserDetailsAuctionWin);
router.post("/winning-confirm", protect, postUserWinConfirmAuction);
router.get("/payment/:invoiceId", protect, getUserPaymentDetails);
router.post("/payment", protect, uploadPaymentProofMiddleware, postUserPayment);
router.get("/track-shipping/:id", protect, getTrackShipping);

export default router;
