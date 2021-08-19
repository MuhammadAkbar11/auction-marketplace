import dayjs from "dayjs";
import expressAsyncHandler from "express-async-handler";
import ModelGaleri from "../models/m_galeri_lelang.js";
import ModelKategori from "../models/m_kategori.js";
import ModelLelang from "../models/m_lelang.js";
import ModelMember from "../models/m_member.js";
import getAutoNumber from "../utils/getAutoNumber.js";
import ResponseError from "../utils/responseError.js";

/*

status_lelang: 0,
  id_member: 'MBR001',
  judul: 'aaaa',
  status_brg: '100% baru',
  hrg_awal: '80.000',
  kelipatan_hrg: '10.000',
  batas_tawaran: 5,
  deskripsi: '',
  id_kategori: '5',
  tgl_mulai: '2021-08-18 23:34',
  tgl_selesai: '2021-08-24 23:34',
  alamat_barang: '{"id_provinsi":"31","id_kota":"3172","id_kecamatan":"3172060","id_kelurahan":"3172060003","alamat":"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta","kode_pos":"13410"}',
  jenis_pengiriman: '{"pickup":true,"courier_service":true}',
  dimensi_brg: '{"panjang":"160","lebar":"200","tinggi":"25","berat":"6000"}',
  biaya_packing: '20000'

*/

const defaultDesc =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.";

export const generateAuction = expressAsyncHandler(async (req, res) => {
  try {
    let newAuctions = [];
    const auctions = await ModelLelang.findAll({
      order: [["_id", "ASC"]],
    });
    const members = await ModelMember.findAll();
    const categories = await ModelKategori.findAll();

    const galeri = await ModelGaleri.findAll();

    const membersId = members.map(unit => unit.id_member);
    const categoriesId = categories.map(item => item.id_kategori);

    const statusArr = [
      "100% Baru",
      "Seperti baru",
      "Bekas dengan kondisi baik",
      "Bekas dengan kondisi cacat",
      "Rusak",
    ];
    const startPriceArr = [
      "100.000",
      "90.000",
      "1.000.000",
      "200.000",
      "300.000",
      "170.000",
      "500.000",
      "250.000",
      "725.000",
    ];

    const dateStart = dayjs().format("YYYY-MM-DD HH:mm");
    const dateEnd = dayjs().add(7, "day").format("YYYY-MM-DD HH:mm");

    const lastAuctions = auctions[auctions.length - 1];
    const lastGaleri = galeri[galeri.length - 1];
    for (
      let i = lastAuctions._id + 1;
      i < +lastAuctions._id + +req.query.result;
      i++
    ) {
      const datePrefix = dayjs().format("DDMMYY");
      let id_lelang = `${datePrefix}000${i}`;

      if (i >= 9) {
        id_lelang = `${datePrefix}00${i}`;
      } else if (i >= 100) {
        id_lelang = `${datePrefix}0${i}`;
      }

      // const id_lelang =
      newAuctions.push({
        _id: i,
        id_lelang,
        id_member: membersId[Math.floor(Math.random() * membersId.length)],
        id_kategori:
          categoriesId[Math.floor(Math.random() * categoriesId.length)],
        judul: "Lelang " + (i + lastAuctions._id),
        status_brg: statusArr[Math.floor(Math.random() * statusArr.length)],
        hrg_awal:
          startPriceArr[Math.floor(Math.random() * startPriceArr.length)],
        kelipatan_hrg: "10.000",
        batas_tawaran: 9,
        deskripsi: defaultDesc,
        tgl_mulai: dateStart,
        tgl_selesai: dateEnd,
        alamat_barang:
          '{"id_provinsi":"31","id_kota":"3172","id_kecamatan":"3172060","id_kelurahan":"3172060003","alamat":"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta","kode_pos":"13410"}',
        jenis_pengiriman: '{"pickup":true,"courier_service":true}',
        dimensi_brg:
          '{"panjang":"200","lebar":"200","tinggi":"200","berat":"6000"}',
        biaya_packing: "20000",
        status_lelang: 1,
      });
    }

    await ModelLelang.bulkCreate(newAuctions);

    let newImages = [];
    newAuctions.map(ac => {
      for (let i = 0; i < 5; i++) {
        newImages.push({
          url: "/uploads/auctions/default.jpg",
          id_lelang: ac.id_lelang,
        });
      }
    });

    await ModelGaleri.bulkCreate(newImages);

    res.status(200).json({
      // result,
      newImages,
      message: "Berhasil mengenerate data",
      status: true,
    });
  } catch (error) {
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
