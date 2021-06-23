import asyncHandler from "express-async-handler";
import daysJs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelMember from "../models/m_member.js";
import ModelLelang from "../models/m_lelang.js";
import ModelGaleri from "../models/m_galeri_lelang.js";
import { deleteFile } from "../utils/file.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await ModelMember.findByPk(req.user.id_member, {
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(201).json({
      message: "success",
      details: {
        ...user.dataValues,
        foto: "/uploads/member/guest.png",
        tgl_dibuat: daysJs(user.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(user.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
      },
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUpdateUserProfile = asyncHandler(async (req, res) => {
  try {
    const {
      nama,
      username,
      kode_pos,
      no_hp,
      no_ktp,
      tgl_lahir,
      alamat,
      id_kecamatan,
      id_kelurahan,
      id_kota,
      id_provinsi,
    } = req.body;
    const user = await ModelMember.findByPk(req.user.id_member);

    const oldUsername = user.username;

    if (user) {
      if (username !== oldUsername) {
        const findUsername = await ModelMember.findOne({
          where: { username: username },
          attributes: {
            include: ["username"],
          },
        });
        if (findUsername) {
          res.status(400);
          throw new ResponseError(400, "Username sudah tersedia");
        }

        user.username = username;
      } else {
        user.username = oldUsername;
      }
      // console.log(object);

      const update = await ModelMember.update(
        {
          nama,
          username,
          kode_pos,
          no_hp,
          no_ktp,
          tgl_lahir,
          alamat,
          id_kecamatan,
          id_kelurahan,
          id_kota,
          id_provinsi,
        },
        {
          where: {
            id_member: user.id_member,
          },
        }
      );

      res.status(201).json({
        status: true,
        message: "Berhasil mengubah data",
      });
    } else {
      res.status(400);
      throw new ResponseError(400, "Gagal mengubah data");
    }
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUserCreateAuction = asyncHandler(async (req, res, next) => {
  try {
    const images = req.fileimg?.data;

    const postData = {
      status_lelang: 0,
      id_member: req.user.id_member,
      judul: req.body.judul,
      status_brg: req.body.status_brg,
      hrg_awal: req.body.hrg_awal,
      kelipatan_hrg: req.body.kelipatan_hrg,
      batas_tawaran: +req.body.batas_tawaran,
      deskripsi: req.body.deskripsi,
      id_kategori: req.body.id_kategori,
      tgl_mulai: req.body.tgl_mulai,
      tgl_selesai: req.body.tgl_selesai,
    };

    const result = await ModelLelang.create({
      ...postData,
    });

    const id_lelang = result.dataValues.id_lelang;

    const auctionGaleri = images.map(img => {
      return {
        url: "/" + img.path,
        id_lelang: id_lelang,
      };
    });

    await ModelGaleri.bulkCreate(auctionGaleri);

    res.status(200).json({
      status: true,
      message: "Berhasil menambah lelang",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const putUserUpdateAuction = asyncHandler(async (req, res, next) => {
  try {
    const images = req.fileimg?.data;
    const auctionId = req.body.id_lelang;
    const postData = {
      id_member: req.user.id_member,
      judul: req.body.judul,
      status_brg: req.body.status_brg,
      hrg_awal: req.body.hrg_awal,
      kelipatan_hrg: req.body.kelipatan_hrg,
      batas_tawaran: +req.body.batas_tawaran,
      deskripsi: req.body.deskripsi,
      id_kategori: req.body.id_kategori,
      tgl_selesai: req.body.tgl_selesai,
    };

    if (req.body.status_lelang === 0) {
      postData.tgl_mulai = req.body.tgl_mulai;
    }

    const existAuction = await ModelLelang.findByPk(auctionId);
    // const result = await ModelLelang.create({
    //   ...postData,
    // });
    // console.log(existAuction);
    if (!existAuction) {
      throw new ResponseError(400, "Gagal mengubah data");
    }

    let oldGaleri = await ModelGaleri.findAll({
      where: { id_lelang: auctionId },
      attributes: {
        exclude: ["ModelLelangIdLelang"],
      },
    });

    let auctionGaleri = [];

    if (images.length !== 0) {
      auctionGaleri = images.map(img => {
        return {
          url: "/" + img.path,
          id_lelang: auctionId,
        };
      });
      await ModelGaleri.bulkCreate(auctionGaleri);
      oldGaleri.map(async og => {
        await ModelGaleri.destroy({
          where: {
            id_galeri: og.id_galeri,
          },
        });
        deleteFile(og.url);
      });
    } else {
      auctionGaleri = oldGaleri;
    }

    await ModelLelang.update(postData, { where: { id_lelang: auctionId } });

    res.status(200).json({
      status: true,
      message: "Berhasil Mengubah lelang",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserAuction = asyncHandler(async (req, res, next) => {
  try {
    const idMember = req.user.id_member;
    const queryStatus = req.query.status.trim();

    let userAuctions = [];

    // console.log(quert);
    if (queryStatus === "planning") {
      const planningAuctions = await ModelLelang.findAll({
        where: {
          id_member: idMember,
          status_lelang: 0,
        },
      });
      if (planningAuctions.length !== 0) {
        userAuctions = planningAuctions.map(auc => {
          return {
            id_lelang: auc.id_lelang,
            judul: auc.judul,
            tgl_mulai: daysJs(auc.tgl_mulai).format("DD/MM/YYYY - HH:mm"),
            tgl_selesai: daysJs(auc.tgl_selesai).format("DD/MM/YYYY - HH:mm"),
          };
        });
      } else {
        userAuctions = [];
      }
    } else if (queryStatus === "active") {
      const activeAuctions = await ModelLelang.findAll({
        where: {
          id_member: idMember,
          status_lelang: 1,
        },
      });

      if (activeAuctions.length !== 0) {
        userAuctions = activeAuctions.map(auc => {
          return {
            id_lelang: auc.id_lelang,
            judul: auc.judul,
            tgl_mulai: daysJs(auc.tgl_mulai).format("DD/MM/YYYY - HH:mm"),
            tgl_selesai: daysJs(auc.tgl_selesai).format("DD/MM/YYYY - HH:mm"),
          };
        });
      } else {
        userAuctions = [];
      }
    }

    res.status(200).json({
      status: true,
      lelang: userAuctions,
      queryStatus,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getAuctionDetails = asyncHandler(async (req, res) => {
  const auctionId = req.params.auctionId;

  try {
    const auction = await ModelLelang.findOne({
      where: { id_lelang: auctionId },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
    });

    if (auction) {
      if (auction.id_member !== req.user.id_member) {
        console.log("okk");
        throw new ResponseError(400, "Gagal mengambil data");
      }

      const images = await ModelGaleri.findAll({
        where: { id_lelang: auctionId },
        attributes: {
          exclude: ["ModelLelangIdLelang"],
        },
      });
      const kategori = await auction.getModelKategori();

      const dateEnd = daysJs(auction.tgl_selesai);
      const dateStart = daysJs(auction.tgl_mulai);
      const duration = dateEnd.diff(dateStart, "day");
      const timeStart = dateStart.format("HH:mm");

      auction.setDataValue("durasi", duration);
      auction.setDataValue("gambar", images);
      auction.setDataValue("kategori", kategori.kategori);
      auction.setDataValue("jam_mulai", timeStart);
      return res.status(200).json({
        status: true,
        lelang: auction,
      });
    }
    res.status(200).json({
      status: true,
      lelang: null,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUserStartAuction = asyncHandler(async (req, res) => {
  const auctionId = req.body.id_lelang;

  // console.log(auctionId, "lelang id");

  try {
    await ModelLelang.update(
      { status_lelang: 1, tgl_mulai: daysJs().format("YYYY-MM-DD HH:mm:ss") },
      {
        where: {
          id_lelang: auctionId,
        },
      }
    );
    res.status(201).json({
      status: true,
      message: "Berhasil mengubah data",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getIsValidData = asyncHandler(async (req, res) => {
  const valid = req.user.isValidData;

  res.status(200).json({
    status: true,
    isValidData: valid,
  });
});
