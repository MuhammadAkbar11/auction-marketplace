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

export const postCategory = asyncHandler(async (req, res) => {
  let { id_kategori, slug, kategori, isEdit } = req.body;

  slug = slug.replace(/\s/g, "-");
  try {
    if (isEdit) {
      const category = await ModelKategori.findOne({
        where: {
          id_kategori: id_kategori,
        },
      });
      if (!category) {
        throw new ResponseError(401, "Kategori tidak dapat di temukan");
      }

      const isExistSlug = await ModelKategori.findAll({
        where: {
          slug,
        },
      });

      if (isExistSlug.length !== 0) {
        throw new ResponseError(401, "Slug sudah tersedia");
      }

      category.slug = slug.toLowerCase();
      category.kategori = kategori;

      await category.save();
      return res.status(201).json({
        status: true,
        message: "Berhasil mengubah data",
      });
    }

    const isExistSlug = await ModelKategori.findAll({
      where: {
        slug,
      },
    });

    if (isExistSlug.length !== 0) {
      throw new ResponseError(401, "Slug sudah tersedia");
    }

    await ModelKategori.create({
      kategori,
      slug: slug.toLowerCase(),
    });

    return res.status(200).json({
      status: true,
      message: "Berhasil menambah data",
    });
  } catch (error) {
    throw new ResponseError(
      error.statusCode,
      error.message ||
        `Gagal ${
          isEdit ? "Gagal mengubah kategori" : "Gagal menambah kategori"
        }`,
      error.errors
    );
  }
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await ModelKategori.findOne({
      where: {
        id_kategori: categoryId,
      },
    });
    if (!category) {
      throw new ResponseError(401, "Kategori tidak dapat di temukan");
    }

    await category.destroy();
    return res.status(201).json({
      status: true,
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
