import express from "express";
import {
  generateAuction,
  generateMember,
} from "../controller/dumb.controller.js";

const router = express.Router();

router.get("/generate-auction", generateAuction);
router.post("/generate-members", generateMember);
// router.get("/:auctionId", getAuction);

export default router;
