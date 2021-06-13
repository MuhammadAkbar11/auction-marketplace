import asyncHandler from "express-async-handler";
import daysJs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelMember from "../models/m_member.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await ModelMember.findByPk(req.user.id_member, {
      attributes: {
        exclude: ["password", "ModelRoleIdRole"],
      },
    });

    const role = await user.getModelRole();
    user.role = role;
    res.status(201).json({
      message: "success",
      details: {
        ...user.dataValues,
        role,
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
    console.log(req.body);
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
      console.table(req.body);
      console.log("=============================");
      console.log(update);
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
