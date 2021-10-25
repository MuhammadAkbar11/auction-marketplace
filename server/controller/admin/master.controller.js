import asyncHandler from "express-async-handler";
import dayjs from "dayjs";
import Sequelize from "sequelize";
import ResponseError from "../../utils/responseError.js";
import ModelMember from "../../models/m_member.js";
import ModelLelang from "../../models/m_lelang.js";
import ModelPenawaran from "../../models/m_penawaran.js";
import ModelDetailTransaksi from "../../models/m_detail_transaksi.js";
import ModelTransaksi from "../../models/m_transaksi.js";
import ModelGaleri from "../../models/m_galeri_lelang.js";
import ModelKategori from "../../models/m_kategori.js";

const Op = Sequelize.Op;

export const getMembers = asyncHandler(async (req, res) => {
  let members = [];

  try {
    const getMembers = await ModelMember.findAll({});

    members = await Promise.all(
      getMembers.map(async unit => {
        const member = unit.dataValues;

        const totalMemberAuctions = await ModelLelang.findAndCountAll({
          where: {
            id_member: member.id_member,
          },
          tgl_mulai: {
            [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
          // status_lelang: {
          //   [Op.in]: [1],
          // },
          attributes: {
            exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
          },
        });

        return {
          ...member,
          total_lelang: totalMemberAuctions,
        };
      })
    );

    return res.status(200).json({
      status: true,
      members,
      count: members.length,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const getMemberDetails = asyncHandler(async (req, res) => {
  try {
    const member = await ModelMember.findOne({
      where: { id_member: req.params.memberId },
    });

    const memberTotalAuction = await ModelLelang.findAndCountAll();

    member.setDataValue("total_lelang", memberTotalAuction);

    return res.status(200).json({
      status: true,
      member,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const adminGetAuctions = asyncHandler(async (req, res) => {
  const { filter } = req.query;

  let auctions = [];
  let whereQuery = {
    tgl_mulai: {
      [Op.lte]: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    },
  };

  switch (filter) {
    case "active":
      whereQuery.status_lelang = {
        // status_lelang: {
        [Op.in]: [1],
        // },
      };
      break;

    default:
      whereQuery = {};
      break;
  }

  try {
    const getAuctions = await ModelLelang.findAll({
      where: whereQuery,

      attributes: {
        exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
      },
    });

    if (getAuctions.length !== 0) {
      auctions = await Promise.all(
        getAuctions.map(async auction => {
          const auctionData = auction.dataValues;
          const auctionId = auctionData.id_lelang;
          const seller = await ModelMember.findOne({
            where: {
              id_member: auction.id_member,
            },
          });
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

          const bidArr =
            tawaran.length !== 0
              ? tawaran.map(bid => {
                  const bidData = bid.dataValues;
                  return {
                    ...bidData,
                    tgl_tawaran: dayjs(bidData.tgl_tawaran).format(
                      "DD/MM/YYYY - HH:mm"
                    ),
                    // member: await bid.getModelMember(),
                  };
                })
              : tawaran;

          const category = await ModelKategori.findOne({
            where: {
              id_kategori: auctionData.id_kategori,
            },
          });

          return {
            ...auctionData,
            penjual: seller,
            tgl_mulai: dayjs(auctionData.tgl_mulai).format(
              "DD/MM/YYYY - HH:mm"
            ),
            tgl_selesai: dayjs(auctionData.tgl_selesai).format(
              "DD/MM/YYYY - HH:mm"
            ),
            kategori: category,
            tawaran: bidArr,
          };
        })
      );
    }
    res.status(200).json({
      status: true,
      filter,
      count: auctions.length,
      auctions: auctions,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

export const adminGetInvoices = asyncHandler(async (req, res) => {
  const invoiceId = req.params.id;

  try {
    if (invoiceId) {
      const invoice = await ModelDetailTransaksi.findOne({
        where: {
          id_detail_transaksi: invoiceId,
        },
        attributes: {
          exclude: ["ModelTransaksiIdTransaksi"],
        },
      });

      const transaction = await ModelTransaksi.findOne({
        where: {
          id_transaksi: invoice.id_transaksi,
        },
        attributes: {
          exclude: ["ModelPenawaranIdTawaran"],
        },
      });

      const bids = await ModelPenawaran.findOne({
        where: {
          id_tawaran: transaction.id_tawaran,
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

      const auction = await ModelLelang.findOne({
        where: {
          id_lelang: bids.id_lelang,
        },
        include: {
          model: ModelMember,
          as: "seller",
          attributes: ["id_member", "nama", "username", "email"],
        },
        attributes: {
          exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
        },
      });

      const auctionImages = await ModelGaleri.findAll({
        where: {
          id_lelang: auction.id_lelang,
        },
        attributes: {
          exclude: ["ModelLelangIdLelang"],
        },
      });
      invoice.waktu_update = dayjs(invoice?.waktu_update).format(
        "DD/MM/YYYY - HH:mm"
      );

      // invoice.setDataValue("waktu_update", updatedFormat);
      invoice.setDataValue("transaksi", transaction);
      invoice.setDataValue("tawaran", bids);
      invoice.setDataValue("lelang", auction);
      invoice.setDataValue("images", auctionImages);

      return res.status(200).json({
        status: true,
        ...req.params,
        invoice,
      });
    }

    let invoices = [];

    const getInvoices = await ModelDetailTransaksi.findAll({
      where: {},
      attributes: {
        exclude: ["ModelTransaksiIdTransaksi"],
      },
    });

    if (getInvoices.length !== 0) {
      invoices = await Promise.all(
        getInvoices.map(async inv => {
          const invData = inv.dataValues;
          const transactionId = invData?.id_transaksi;

          if (transactionId) {
            const transaction = await ModelTransaksi.findOne({
              where: {
                id_transaksi: invData.id_transaksi,
              },
              attributes: {
                exclude: ["ModelPenawaranIdTawaran"],
              },
            });

            const bids = await ModelPenawaran.findOne({
              where: {
                id_tawaran: transaction.id_tawaran,
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

            const auction = await ModelLelang.findOne({
              where: {
                id_lelang: bids.id_lelang,
              },
              include: {
                model: ModelMember,
                as: "seller",
                attributes: ["id_member", "nama", "username", "email"],
              },
              attributes: {
                exclude: ["ModelMemberIdMember", "ModelKategoriIdKategori"],
              },
            });

            return {
              ...invData,
              transaksi: transaction,
              tawaran: bids,
              lelang: auction,
              tgl_dibuat: dayjs(invData.tgl_dibuat).format("DD/MM/YYYY"),
              waktu_update: dayjs(invData.waktu_update).format("DD/MM/YYYY"),
            };
          }

          return null;
        })
      );
    }

    const invoiceFiltered =
      invoices.length !== 0 ? invoices.filter(item => item !== null) : [];

    res.status(200).json({
      status: true,
      ...req.params,
      count: invoiceFiltered.length,
      invoices: invoiceFiltered,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
