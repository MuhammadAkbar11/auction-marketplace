import express from "express";
import {
  getAuction,
  getListAuction,
} from "../controller/auction.controllers.js";

const router = express.Router();

router.get("/", getListAuction);
router.get("/:auctionId", getAuction);

export default router;
