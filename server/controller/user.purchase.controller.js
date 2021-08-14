import asyncHandler from "express-async-handler";
import ModelLelang from "../models/m_lelang.js";
import ModelMember from "../models/m_member.js";
import ModelPenawaran from "../models/m_penawaran.js";
import ResponseError from "../utils/responseError.js";
import Sequelize from "sequelize";
import dayjs from "dayjs";
import ModelTransaksi from "../models/m_transaksi.js";
import { isEmptyObj } from "../utils/checkObj.js";
import ModelGaleri from "../models/m_galeri_lelang.js";
import ModelAkunBank from "../models/m_akun_bank.js";
import onlyNumbers from "../utils/onlyNumber.js";

export const getUserBids = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id_member;
    const userListBid = await ModelPenawaran.findAll({
      where: {
        id_member: userId,
      },
      attributes: {
        exclude: ["ModelLelangIdLelang", "ModelMemberIdMember"],
      },
    });

    const seen = new Set();

    const auctionId = userListBid
      .filter(el => {
        const duplicate = seen.has(el.id_lelang);
        seen.add(el.id_lelang);
        return !duplicate;
      })
      .filter(el => el.id_lelang !== null)
      .map(bid => bid.id_lelang);

    const auctions = await ModelLelang.findAll({
      where: {
        id_lelang: auctionId,
      },
      attributes: [
        "id_lelang",
        "judul",
        "status_lelang",
        "tgl_mulai",
        "tgl_selesai",
      ],
    });

    await Promise.all(
      auctions.map(async item => {
        const auctionData = item.dataValues;
        const auctionId = auctionData.id_lelang;
        const listBid = await ModelPenawaran.findAll({
          where: {
            id_lelang: auctionId,
          },
          order: [["nilai_tawaran", "DESC"]],
          include: {
            model: ModelMember,
            as: "member",
            attributes: ["id_member", "nama", "username", "email"],
          },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelLelangIdLelang"],
          },
        });

        const valueOfDateEnd = dayjs(auctionData.tgl_selesai).valueOf();
        const valueOfCurrentTime = dayjs().valueOf();

        const _second = 1000;
        const _minute = _second * 60;
        const _hour = _minute * 60;
        const _day = _hour * 24;

        let countdown = valueOfDateEnd - valueOfCurrentTime;

        const days = Math.floor(countdown / _day);
        const hours = Math.floor((countdown % _day) / _hour);
        const minutes = Math.floor((countdown % _hour) / _minute);
        const seconds = Math.floor((countdown % _minute) / _second);

        auctionData.berakhir_dalam = `${days}h ${hours}j ${minutes}m ${seconds}d`;

        auctionData.tgl_selesai = dayjs(auctionData.tgl_selesai).format(
          " DD/MM/YYYY - HH:mm"
        );

        if (countdown <= 0) {
          auctionData.berakhir_dalam = `Telah selesai`;
        }

        auctionData.tawaran = listBid;
        auctionData.tawaran_saya = listBid.filter(b => b.id_member === userId);
        return auctionData;
      })
    );

    res.status(200).json({
      status: true,
      myBids: auctions,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserWinAuction = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id_member;
    const userListBid = await ModelPenawaran.findAll({
      where: {
        id_member: userId,
        status_tawaran: 1,
      },
      attributes: {
        exclude: ["ModelLelangIdLelang", "ModelMemberIdMember"],
      },
    });

    const seen = new Set();

    const auctionId = userListBid
      .filter(el => {
        const duplicate = seen.has(el.id_lelang);
        seen.add(el.id_lelang);
        return !duplicate;
      })
      .filter(el => el.id_lelang !== null)
      .map(bid => bid.id_lelang);

    const lisBidId = userListBid.map(bid => bid.id_tawaran);

    // const auctions = await ModelLelang.findAll({
    //   where: {
    //     id_lelang: auctionId,
    //   },
    //   attributes: [
    //     "id_lelang",
    //     "judul",
    //     "status_lelang",
    //     "tgl_mulai",
    //     "tgl_selesai",
    //   ],
    // });

    const transactions = await ModelTransaksi.findAll({
      where: {
        id_tawaran: lisBidId,
      },
      order: [["status_transaksi", "DESC"]],
      // include: [{ model: ModelPenawaran }],
      attributes: {
        exclude: ["ModelPenawaranIdTawaran"],
      },
    });

    let transformTransaction = [];

    transformTransaction = await Promise.all(
      transactions.map(async item => {
        const transactionData = item.dataValues;

        let expiredPayment = null;

        // const shippingData = {
        //   nama_penerima: transactionData.nama_penerima,
        //   nohp_penerima: transactionData.nohp_penerima,
        //   alamat_tujuan: transactionData.alamat_tujuan,
        // };

        const bid = await item.getModelPenawaran({
          where: {},
          attributes: ["id_tawaran", "id_lelang", "nilai_tawaran"],
        });
        const auction = await ModelLelang.findOne({
          where: {
            id_lelang: bid.id_lelang,
          },
          attributes: [
            "id_lelang",
            "judul",
            "tgl_mulai",
            "tgl_selesai",
            "id_member",
          ],
        });

        if (transactionData.batas_waktu_bayar) {
          const paymentDeadline = dayjs(transactionData.batas_waktu_bayar);
          const diffNowAndPaymentDeadline =
            paymentDeadline.valueOf() - dayjs().valueOf();

          if (diffNowAndPaymentDeadline <= 0) {
            expiredPayment = true;
          }
        }

        const seller = await auction.getModelMember();
        const images = await ModelGaleri.findAll({
          where: { id_lelang: auction.id_lelang },
          attributes: ["id_lelang", "id_galeri", "url"],
        });
        auction.setDataValue(
          "tgl_selesai",
          dayjs(auction.tgl_selesai).format("DD/MM/YYYY")
        );
        auction.setDataValue("penjual", { email: seller.email });
        auction.setDataValue("gambar", images);

        transactionData.tawaran = bid;
        transactionData.lelang = auction;
        transactionData.isPaymentExp = expiredPayment;
        return transactionData;
      })
    );

    res.status(200).json({
      lelang: transformTransaction,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserDetailsAuctionWin = asyncHandler(async (req, res) => {
  try {
    const invoiceId = req.params.invoiceId;
    if (!invoiceId) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }

    const invoice = await ModelTransaksi.findOne({
      where: {
        id_transaksi: invoiceId,
      },
      attributes: [
        "id_transaksi",
        "id_tawaran",
        "status_transaksi",
        "status_transaksi",
        "total_harga",
      ],
    });

    const bid = await ModelPenawaran.findOne({
      where: {
        id_tawaran: invoice.id_tawaran,
      },
      attributes: ["id_tawaran", "id_lelang", "nilai_tawaran"],
    });

    const auction = await ModelLelang.findOne({
      where: {
        id_lelang: bid.id_lelang,
      },
      attributes: [
        "id_lelang",
        "judul",
        "tgl_mulai",
        "tgl_selesai",
        "id_member",
        "jenis_pengiriman",
        "biaya_packing",
      ],
    });

    invoice.setDataValue("tawaran", bid);
    invoice.setDataValue("lelang", auction);

    res.status(200).json({
      invoice: invoice,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUserWinConfirmAuction = asyncHandler(async (req, res) => {
  const {
    id_transaksi,
    alamat_tujuan,
    jenis_pengiriman,
    nama_penerima,
    biaya_packing,
    nohp_penerima,
  } = req.body;

  let totalPrice = 0;

  let paymentLimit = null;
  let message =
    "Anda telah berhasil mengkonfirmasi lelang yang dimenangkan, selanjutnya penjual akan mengupdate tagihan yang akan dibayar anda";

  try {
    const getTransaction = await ModelTransaksi.findOne({
      where: {
        id_transaksi,
      },
    });

    if (!getTransaction) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }

    let status_transaksi = 1;

    if (jenis_pengiriman === "PICKUP") {
      const bid = await getTransaction.getModelPenawaran({
        where: {},
        attributes: ["id_tawaran", "id_lelang", "id_member", "nilai_tawaran"],
      });
      const bidValueToNum = +onlyNumbers(bid.nilai_tawaran);
      totalPrice = bidValueToNum + +biaya_packing;
      status_transaksi = 2;
      paymentLimit = dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss");
      message = "Konfirmasi berhasil silahkan lakukan pembayaran";
    }

    await ModelTransaksi.update(
      {
        nama_penerima,
        nohp_penerima,
        jenis_pengiriman,
        status_transaksi,
        alamat_tujuan: JSON.stringify(alamat_tujuan),
        total_harga: totalPrice,
        batas_waktu_bayar: paymentLimit,
      },
      {
        where: {
          id_transaksi,
        },
      }
    );

    res.status(201).json({
      status: true,
      message,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getUserPaymentDetails = asyncHandler(async (req, res) => {
  let expiredPayment = null;

  try {
    const invoiceId = req.params.invoiceId;
    if (!invoiceId) {
      res.status(400);
      throw new ResponseError(400, "Id Transkasi tidak ditemukan");
    }

    const invoice = await ModelTransaksi.findOne({
      where: {
        id_transaksi: invoiceId,
      },
      attributes: {
        exclude: ["ModelPenawaranIdTawaran"],
      },
    });

    if (invoice) {
      const bid = await ModelPenawaran.findOne({
        where: {
          id_tawaran: invoice.id_tawaran,
        },
        attributes: ["id_tawaran", "id_lelang", "nilai_tawaran"],
      });

      const auction = await ModelLelang.findOne({
        where: {
          id_lelang: bid.id_lelang,
        },
        attributes: [
          "id_lelang",
          "judul",
          "tgl_mulai",
          "tgl_selesai",
          "id_member",
          "jenis_pengiriman",
          "biaya_packing",
        ],
      });

      const seller = await auction.getModelMember();
      const sellerBankAccounts = await ModelAkunBank.findAll({
        where: {
          id_member: seller.id_member,
        },
        attributes: {
          exclude: ["ModelMemberIdMember"],
        },
      });
      const images = await ModelGaleri.findAll({
        where: { id_lelang: auction.id_lelang },
        attributes: ["id_lelang", "id_galeri", "url"],
      });

      const penjual = {
        email: seller.email,
        nama: seller.nama,
        username: seller?.username,
        akun_bank: sellerBankAccounts,
      };

      auction.setDataValue("penjual", penjual);
      auction.setDataValue("gambar", images);

      if (invoice.batas_waktu_bayar) {
        const paymentDeadline = dayjs(invoice.batas_waktu_bayar);
        const diffNowAndPaymentDeadline =
          paymentDeadline.valueOf() - dayjs().valueOf();

        if (diffNowAndPaymentDeadline <= 0) {
          expiredPayment = true;
        }
      }

      invoice.setDataValue("tawaran", bid);
      invoice.setDataValue("lelang", auction);
      invoice.setDataValue("isPaymentExp", expiredPayment);
      return res.status(200).json({
        invoice: invoice,
      });
    }

    throw new ResponseError(400, "Data tidak dapat ditemukan");
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const postUserPayment = asyncHandler(async (req, res) => {
  try {
    res.status(201).json({
      request: req.body,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
