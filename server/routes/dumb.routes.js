import express from "express";
import { generateAuction } from "../controller/dumb.controller.js";

const router = express.Router();

router.get("/generate-auction", generateAuction);
// router.get("/:auctionId", getAuction);

export default router;
