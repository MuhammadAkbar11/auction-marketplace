import asyncHandler from "express-async-handler";
import multer from "multer";
import daysJs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelLelang from "../models/m_lelang.js";
import ModelGaleri from "../models/m_galeri_lelang.js";

// export const postCreateAuction = asyncHandler(async (req, res, next) => {
//   try {
//     const images = req.fileimg?.data;

//     const postData = {
//       status_lelang: 0,
//       id_member: req.user.id_member,
//       nama_brg: req.body.nama_brg,
//       status_brg: req.body.status_brg,
//       hrg_awal: req.body.hrg_awal,
//       kelipatan_hrg: req.body.kelipatan_hrg,
//       batas_tawaran: +req.body.batas_tawaran,
//       deskripsi: req.body.deskripsi,
//       id_kategori: req.body.id_kategori,
//       tgl_mulai: req.body.tgl_mulai,
//       tgl_selesai: req.body.tgl_selesai,
//     };

//     const result = await ModelLelang.create({
//       ...postData,
//     });

//     const id_lelang = result.dataValues.id_lelang;

//     const auctionGaleri = images.map(img => {
//       return {
//         url: "/" + img.path,
//         id_lelang: id_lelang,
//       };
//     });

//     await ModelGaleri.bulkCreate(auctionGaleri);

//     res.status(200).json({
//       status: true,
//       message: "Berhasil menambah lelang",
//     });
//   } catch (error) {
//     throw new ResponseError(error.statusCode, error.message, error.errors);
//   }
// });

// export const getUserAuction = asyncHandler(async (req, res, next) => {
//   try {
//     const idMember = req.user.id_member;

//     res.status(200).json({
//       status: true,
//       id_member: idMember,
//     });
//   } catch (error) {
//     throw new ResponseError(error.statusCode, error.message, error.errors);
//   }
// });
