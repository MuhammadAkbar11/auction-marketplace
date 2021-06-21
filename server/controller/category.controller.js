import asyncHandler from "express-async-handler";
import daysJs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelKategori from "../models/m_kategori.js";

export const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await ModelKategori.findAll({
      order: [["kategori", "ASC"]],
    });

    res.status(200).json({
      status: true,
      categories,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
