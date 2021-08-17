import asyncHandler from "express-async-handler";
import Sequelize from "sequelize";
import daysJs from "dayjs";
import ResponseError from "../utils/responseError.js";
import ModelMember from "../models/m_member.js";
import ModelLelang from "../models/m_lelang.js";
import ModelGaleri from "../models/m_galeri_lelang.js";
import { deleteFile } from "../utils/file.js";
import ModelPenawaran from "../models/m_penawaran.js";
import ModelTransaksi from "../models/m_transaksi.js";
import ModelAkunBank from "../models/m_akun_bank.js";
import onlyNumbers from "../utils/onlyNumber.js";
import dayjs from "dayjs";
import ModelDetailTransaksi from "../models/m_detail_transaksi.js";

const Op = Sequelize.Op;

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await ModelMember.findByPk(req.user.id_member, {
      attributes: {
        exclude: ["password"],
      },
    });

    const bankAccounts = await ModelAkunBank.findAll({
      where: {
        id_member: user.id_member,
      },
      attributes: {
        exclude: ["ModelMemberIdMember"],
      },
    });

    res.status(201).json({
      message: "success",
      details: {
        ...user.dataValues,
        foto: "/uploads/member/guest.png",
        tgl_dibuat: daysJs(user.tgl_dibuat).format("DD MMM, YYYY - HH.mm"),
        tgl_diubah: daysJs(user.tgl_diubah).format("DD MMM, YYYY - HH.mm"),
        akun_bank: bankAccounts,
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

export const postUserCreateBankAccount = asyncHandler(
  async (req, res, next) => {
    const { no_rek, nama_rek, nama_bank } = req.body;
    const userId = req.user.id_member;
    try {
      await ModelAkunBank.create({
        no_rek,
        nama_rek,
        nama_bank,
        id_member: userId,
      });

      res.status(201).json({
        body: req.body,
        status: true,
        message: "Berhasil menambah akun bank",
      });
    } catch (error) {
      throw new ResponseError(error.statusCode, error.message, error.errors);
    }
  }
);

export const deleteUserBankAccont = asyncHandler(async (req, res, next) => {
  const accountId = req.body.id_akun;

  try {
    const getAccount = await ModelAkunBank.findByPk(accountId);

    if (!getAccount) {
      res.status(400);
      throw new ResponseError(400, "Id Belum terdaftar tidak ditemukan");
    }

    await ModelAkunBank.destroy({
      where: {
        id_akun: getAccount.id_akun,
      },
    });

    res.status(201).json({
      status: true,
      message: "Berhasil menghapus akun rekening",
    });
  } catch (error) {
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
      alamat_barang: req.body.alamat_barang,
      jenis_pengiriman: req.body.jenis_pengiriman,
      dimensi_brg: req.body.dimensi_brg,
      biaya_packing: req.body.biaya_packing,
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
    const reqStatusBrg = req.body.status_brg;
    const postData = {
      id_member: req.user.id_member,
      judul: req.body.judul,
      hrg_awal: req.body.hrg_awal,
      kelipatan_hrg: req.body.kelipatan_hrg,
      batas_tawaran: +req.body.batas_tawaran,
      deskripsi: req.body.deskripsi,
      id_kategori: req.body.id_kategori,
      tgl_selesai: req.body.tgl_selesai,
      alamat_barang: req.body.alamat_barang,
      jenis_pengiriman: req.body.jenis_pengiriman,
      dimensi_brg: req.body.dimensi_brg,
      biaya_packing: req.body.biaya_packing,
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
        // deleteFile(og.url);
      });
    } else {
      auctionGaleri = oldGaleri;
    }
    const statusBrg =
      reqStatusBrg !== "1" ? reqStatusBrg : existAuction.status_brg;
    // console.log(reqStatusBrg !== "1");
    await ModelLelang.update(
      { ...postData, status_brg: statusBrg },
      { where: { id_lelang: auctionId } }
    );

    res.status(200).json({
      status: true,
      message: "Berhasil Mengubah lelang",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserAuction = asyncHandler(async (req, res, next) => {
  const idMember = req.user.id_member;
  const queryStatus = req.query.status.trim();
  try {
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
        userAuctions = await Promise.all(
          activeAuctions.map(async auction => {
            const auctionData = auction.dataValues;
            const auctionId = auctionData.id_lelang;

            const tawaran = await ModelPenawaran.findAll({
              where: {
                id_lelang: auctionId,
              },
              order: [["tgl_tawaran", "DESC"]],
              include: {
                model: ModelMember,
                as: "member",
                attributes: ["id_member", "nama", "username", "email"],
              },
              attributes: {
                exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
                // include: ["id_member", "nama", "username", "email"],
              },
            });

            const transformTawaranArr =
              tawaran.length !== 0
                ? tawaran.map(bid => {
                    const bidData = bid.dataValues;
                    return {
                      ...bidData,
                      tgl_tawaran: daysJs(bidData.tgl_tawaran).format(
                        "DD/MM/YYYY - HH:mm"
                      ),
                      // member: await bid.getModelMember(),
                    };
                  })
                : tawaran;

            return {
              id_lelang: auctionData.id_lelang,
              judul: auctionData.judul,
              tgl_mulai: daysJs(auctionData.tgl_mulai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              tgl_selesai: daysJs(auctionData.tgl_selesai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              tawaran: transformTawaranArr,
            };
          })
        );

        // userAuctions = activeAuctions.map(auc => {
        //   return {
        //     id_lelang: auc.id_lelang,
        //     judul: auc.judul,
        //     tgl_mulai: daysJs(auc.tgl_mulai).format("DD/MM/YYYY - HH:mm"),
        //     tgl_selesai: daysJs(auc.tgl_selesai).format("DD/MM/YYYY - HH:mm"),
        //   };
        // });
      } else {
        userAuctions = [];
      }
    } else if (queryStatus === "complete") {
      const doneAuctions = await ModelLelang.findAll({
        where: {
          id_member: idMember,
          status_lelang: {
            [Op.in]: [2, 3, 4, 5],
          },
        },
      });

      if (doneAuctions.length !== 0) {
        userAuctions = await Promise.all(
          doneAuctions.map(async auction => {
            const auctionData = auction.dataValues;
            const auctionId = auctionData.id_lelang;

            const tawaran = await ModelPenawaran.findAll({
              where: {
                id_lelang: auctionId,
              },
              order: [["tgl_tawaran", "DESC"]],
              include: {
                model: ModelMember,
                as: "member",
                attributes: ["id_member", "nama", "username", "email"],
              },
              attributes: {
                exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
                // include: ["id_member", "nama", "username", "email"],
              },
            });

            const transformTawaranArr =
              tawaran.length !== 0
                ? tawaran.map(bid => {
                    const bidData = bid.dataValues;
                    return {
                      ...bidData,
                      tgl_tawaran: daysJs(bidData.tgl_tawaran).format(
                        "DD/MM/YYYY - HH:mm"
                      ),
                      // member: await bid.getModelMember(),
                    };
                  })
                : tawaran;

            return {
              id_lelang: auctionData.id_lelang,
              judul: auctionData.judul,
              status_lelang: auctionData.status_lelang,
              tgl_mulai: daysJs(auctionData.tgl_mulai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              tgl_selesai: daysJs(auctionData.tgl_selesai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              tawaran: transformTawaranArr,
            };
          })
        );

        // userAuctions = activeAuctions.map(auc => {
        //   return {
        //     id_lelang: auc.id_lelang,
        //     judul: auc.judul,
        //     tgl_mulai: daysJs(auc.tgl_mulai).format("DD/MM/YYYY - HH:mm"),
        //     tgl_selesai: daysJs(auc.tgl_selesai).format("DD/MM/YYYY - HH:mm"),
        //   };
        // });
      } else {
        userAuctions = [];
      }
    } else if (queryStatus === "sold") {
      const soldItem = await ModelLelang.findAll({
        where: {
          id_member: idMember,
          status_lelang: {
            [Op.in]: [3, 4, 5],
          },
        },
      });

      if (soldItem.length !== 0) {
        userAuctions = await Promise.all(
          soldItem.map(async auction => {
            const auctionData = auction.dataValues;
            const auctionId = auctionData.id_lelang;

            let expiredPayment = null;

            const tawaran = await ModelPenawaran.findAll({
              where: {
                id_lelang: auctionId,
              },
              order: [["tgl_tawaran", "DESC"]],
              include: {
                model: ModelMember,
                as: "member",
                attributes: ["id_member", "nama", "username", "email"],
              },
              attributes: {
                exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
              },
            });

            const transaction = await ModelTransaksi.findOne({
              where: {
                id_tawaran: tawaran[0]?.id_tawaran,
              },
              attributes: ["id_transaksi", "status_transaksi", "id_tawaran"],
            });

            if (transaction.batas_waktu_bayar) {
              const paymentDeadline = daysJs(transaction.batas_waktu_bayar);
              const diffNowAndPaymentDeadline =
                paymentDeadline.valueOf() - dayjs().valueOf();

              if (diffNowAndPaymentDeadline <= 0) {
                expiredPayment = true;
              } else {
                expiredPayment = false;
              }
            }

            const transformBids =
              tawaran.length !== 0
                ? tawaran.map(bid => {
                    const bidData = bid.dataValues;
                    return {
                      ...bidData,
                      tgl_tawaran: daysJs(bidData.tgl_tawaran).format(
                        "DD/MM/YYYY - HH:mm"
                      ),
                      // member: await bid.getModelMember(),
                    };
                  })
                : tawaran;

            return {
              id_lelang: auctionData.id_lelang,
              judul: auctionData.judul,
              status_lelang: auctionData.status_lelang,
              tgl_mulai: daysJs(auctionData.tgl_mulai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              tgl_selesai: daysJs(auctionData.tgl_selesai).format(
                "DD/MM/YYYY - HH:mm"
              ),
              isPaymentExp: expiredPayment,
              ...transaction.dataValues,
              daftar_tawaran: transformBids,
            };
          })
        );
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

      auction.setDataValue("durasi", +duration);
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
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUserStartAuction = asyncHandler(async (req, res) => {
  const auctionId = req.body.id_lelang;

  // console.log(auctionId, "lelang id");

  try {
    const currentDate = daysJs().format("YYYY-MM-DD HH:mm:ss");
    await ModelLelang.update(
      { status_lelang: 1, tgl_mulai: currentDate },
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

export const postDeleteAuction = asyncHandler(async (req, res) => {
  const id = req.params.auctionId;

  try {
    await ModelLelang.destroy({ where: { id_lelang: id } });

    const oldGaleri = await ModelGaleri.findAll({
      where: { id_lelang: id },
      attributes: {
        exclude: ["ModelLelangIdLelang"],
      },
    });

    const galeriId = oldGaleri.map(gal => gal.id_galeri);
    await ModelGaleri.destroy({
      where: {
        id_galeri: [...galeriId],
      },
    });
    oldGaleri.map(async og => {
      deleteFile(og.url);
    });

    res.status(201).json({
      id,
      status: true,
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postCloseAuction = asyncHandler(async (req, res) => {
  const id = req.params.auctionId;

  try {
    await ModelLelang.update(
      {
        status_lelang: 2,
        tgl_selesai: daysJs().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        where: {
          id_lelang: id,
        },
      }
    );
    const bids = await ModelPenawaran.findAll({
      where: {
        id_lelang: id,
      },
      order: [["tgl_tawaran", "DESC"]],
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
      },
    });

    // console.log(bids[]);
    if (bids.length !== 0) {
      const highestBid = bids[0].dataValues;
      const highestBidId = highestBid.id_tawaran;
      await ModelPenawaran.update(
        { status_tawaran: 1 },
        {
          where: {
            id_tawaran: highestBidId,
          },
        }
      );
    }

    res.status(201).json({
      id,
      status: true,
      type: "close",
      message: "Berhasil menghapus data",
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postConfirmBid = asyncHandler(async (req, res) => {
  const bidId = req.body.id_tawaran;
  // const shippingType = req.body.jenis_pengiriman;

  try {
    const getBid = await ModelPenawaran.findOne({
      where: { id_tawaran: bidId },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
      },
    });

    if (getBid) {
      await ModelPenawaran.update(
        { status_tawaran: 1 },
        {
          where: {
            id_tawaran: bidId,
          },
        }
      );

      await ModelLelang.update(
        { status_lelang: 3 },
        {
          where: {
            id_lelang: getBid.id_lelang,
          },
        }
      );

      const invoice = await ModelTransaksi.create({
        status_bayar: 0,
        id_tawaran: getBid.id_tawaran,
        status_transaksi: 0,
        // jenis_pengiriman: JSON.stringify(shippingType),
      });

      // console.log(getBid);

      res.status(201).json({
        invoice,
        tawaran: getBid,
        status: true,
        message: "Berhasil mengkonfirmasi",
      });
    }
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserSoldItemDetails = asyncHandler(async (req, res) => {
  // const memberId = req.user.id_member;
  const invoiceId = req.params.invoiceId;

  try {
    if (!invoiceId) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }
    const invoice = await ModelTransaksi.findOne({
      where: {
        id_transaksi: invoiceId,
      },
    });

    if (invoice) {
      const bid = await ModelPenawaran.findOne({
        where: {
          id_tawaran: invoice.id_tawaran,
        },
        include: {
          model: ModelMember,
          as: "member",
          attributes: ["id_member", "nama", "username", "email", "no_hp"],
        },
        attributes: ["id_tawaran", "id_lelang", "nilai_tawaran", "id_member"],
      });

      const auction = await ModelLelang.findOne({
        where: {
          id_lelang: bid.id_lelang,
        },
        attributes: {
          exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
        },
      });

      invoice.setDataValue("tawaran", bid);
      invoice.setDataValue("lelang", auction);

      return res.status(200).json({
        details: invoice,
      });
    }
    throw new ResponseError(400, "Data tidak ditemukan", { type: "not found" });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postSellerConfirmBill = asyncHandler(async (req, res) => {
  const { id_transaksi, ongkir } = req.body;
  try {
    if (!id_transaksi) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }
    const invoice = await ModelTransaksi.findOne({
      where: {
        id_transaksi: id_transaksi,
      },
    });

    const bid = await ModelPenawaran.findOne({
      where: {
        id_tawaran: invoice.id_tawaran,
      },
      include: {
        model: ModelMember,
        as: "member",
        attributes: ["id_member", "nama", "username", "email", "no_hp"],
      },
      attributes: ["id_tawaran", "id_lelang", "nilai_tawaran", "id_member"],
    });

    const auction = await ModelLelang.findOne({
      where: {
        id_lelang: bid.id_lelang,
      },
      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
    });

    let totalPrice = 0;

    const bidPrice = +onlyNumbers(bid.nilai_tawaran);
    const packingFee = +auction.biaya_packing;
    const shippingCost = +ongkir;

    totalPrice = bidPrice + packingFee + shippingCost;

    await ModelTransaksi.update(
      {
        ongkir,
        total_harga: totalPrice,
        batas_waktu_bayar: daysJs().add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
        status_transaksi: 2,
      },
      { where: { id_transaksi } }
    );

    return res.status(200).json({
      status: true,
      message: "Berhasil mengubah tagihan",
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getCustomerPaymentDetails = asyncHandler(async (req, res) => {
  // const memberId = req.user.id_member;
  const invoiceId = req.params.invoiceId;

  try {
    if (!invoiceId) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }
    const invoice = await ModelTransaksi.findOne({
      where: {
        id_transaksi: invoiceId,
      },
    });

    if (invoice) {
      const bid = await ModelPenawaran.findOne({
        where: {
          id_tawaran: invoice.id_tawaran,
        },
        include: {
          model: ModelMember,
          as: "member",
          attributes: ["id_member", "nama", "username", "email", "no_hp"],
        },
        attributes: ["id_tawaran", "id_lelang", "nilai_tawaran", "id_member"],
      });

      const auction = await ModelLelang.findOne({
        where: {
          id_lelang: bid.id_lelang,
        },
        attributes: {
          exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
        },
      });

      const evidenceTransfer = JSON.parse(invoice.bukti_transfer);

      invoice.setDataValue("tawaran", bid);
      invoice.setDataValue("lelang", auction);
      invoice.setDataValue(
        "tgl_bayar",
        daysJs(invoice.tgl_bayar).format("DD MMM YYYY ")
      );
      invoice.setDataValue("bank_tujuan", evidenceTransfer.bank_tujuan);
      invoice.setDataValue("bukti_transfer", evidenceTransfer.bukti);
      invoice.setDataValue("jenis_pembayaran", "Bank Transfer");

      return res.status(200).json({
        details: invoice,
      });
    }
    throw new ResponseError(400, "Data tidak ditemukan", { type: "not found" });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postConfirmCustomerPayment = asyncHandler(async (req, res) => {
  const { status, id_transaksi } = req.body;
  try {
    if (!id_transaksi) {
      res.status(500);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }

    let invoice = await ModelTransaksi.findByPk(id_transaksi);

    if (status === "ACCEPT") {
      invoice.status_bayar = 2;
      invoice.status_transaksi = 4;

      const invoiceDetail = await ModelDetailTransaksi.findOne({
        where: {
          id_transaksi: id_transaksi,
        },
      });

      invoiceDetail.status = 1;

      await invoice.save();
      await invoiceDetail.save();

      return res.status(200).json({
        status: true,
        message: "Anda telah menyetujui bukti pembayaran pelanggan",
      });
    } else {
      if (status === "DECLINE") {
        invoice.status_bayar = 1;
        invoice.status_transaksi = 2;

        await invoice.save();
        await ModelDetailTransaksi.destroy({
          where: {
            id_transaksi: id_transaksi,
          },
        });

        return res.status(200).json({
          status: true,
          message: "Anda telah menolak bukti pembayaran pelanggan",
        });
      } else {
        throw new ResponseError(400, "Tidak dapat melakukan konfirmasi");
      }
    }
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
