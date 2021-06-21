import express from "express";

import { getCategories } from "../controller/category.controller.js";

const router = express.Router();

router.get("/", getCategories);

export default router;
