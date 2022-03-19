import dayjs from "dayjs";
import axios from "axios";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import ModelGaleri from "../models/m_galeri_lelang.js";
import ModelKategori from "../models/m_kategori.js";
import ModelLelang from "../models/m_lelang.js";
import ModelMember from "../models/m_member.js";
import ResponseError from "../utils/responseError.js";
import onlyNumbers from "../utils/onlyNumber.js";

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

const randomSelect = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

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
    const startID = lastAuctions ? lastAuctions?._id + 1 : 1;
    const maxResult = lastAuctions
      ? +lastAuctions._id + +req.query.result
      : +req.query.result;
    for (let i = startID; i < maxResult; i++) {
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
        judul: "Lelang " + i,
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
        // const url = Math.floor(Math.random() * i) * +ac._id;
        newImages.push({
          url: "/uploads/auctions/default.jpg",
          // url: `https://source.unsplash.com/random/300x200?sig=${url}`,
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
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});

const generatePhone = id => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const head = `08${randomSelect(numbers)}${randomSelect(numbers)}`;

  const body = `${randomSelect(numbers)}${randomSelect(numbers)}${randomSelect(
    numbers
  )}${randomSelect(numbers)}`;

  const tail = Number(
    `${randomSelect(numbers)}${randomSelect(numbers)}${randomSelect(
      numbers
    )}${randomSelect(numbers)}`
  );

  const sumTailWithId = `${tail + +id}`;
  // console.log();
  const transformTail =
    sumTailWithId.length >= 4 ? +sumTailWithId.substring(0, 4) : +sumTailWithId;

  return `${head}${body}${transformTail}`;
};

export const generateMember = expressAsyncHandler(async (req, res) => {
  const { result } = req.body || 25;

  const provinceId = [31, 32];
  // const cityId1 = [3171, 3172, 3173, 3174, 3175];
  // const cityId2 = [3201, 3209, 3214, 3215, 3216, 3217, 3271, 3272, 3275, 3274];

  // const years = [];
  // const moths

  try {
    const newUsers = [];

    const lastInsert = await ModelMember.findAll({
      where: {},
      order: [["id_member", "DESC"]],
      limit: 1,
    });

    const lastId = onlyNumbers(lastInsert[0].id_member);
    const startId = +lastId + 1;
    const maxItems = startId + result;
    console.log(startId, lastId);
    for (let i = startId; i < maxItems; i++) {
      let username = "Unit 00" + i;
      let memberId = "MBR00" + i;

      if (i > 9) {
        username = "Unit 0" + i;
        memberId = "MBR0" + i;
      }
      if (i > 99) {
        username = "Unit " + i;
        memberId = "MBR" + i;
      }

      const unit = username.split(" ").join("").toLowerCase();
      const phone = generatePhone(i);
      newUsers.push({
        id_member: memberId,
        username: unit,
        nama: username,
        email: unit + "@gmail.com",
        password: "baebid-2021",
        no_hp: phone,
        foto: "uploads/members/guest.jpeg",
        tgl_dibuat: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        tgl_diubah: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        alamat: "user address",
      });
    }

    const members = await Promise.all(
      newUsers.map(async user => {
        const defaultDomicile = {
          id_kecamatan: 3275010,
          id_kelurahan: 3275010008,
          id_provinsi: 32,
          id_kota: 3275,
        };

        const province = randomSelect(provinceId);
        const cities = await axios.get(
          "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=" +
            province
        );

        const city = randomSelect(cities.data?.kota_kabupaten);
        const districts = await axios.get(
          "https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=" +
            city.id
        );

        const district = randomSelect(districts.data.kecamatan);

        const wards = await axios.get(
          "https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=" +
            district.id
        );

        const ward = randomSelect(wards.data.kelurahan);

        const domicile = {
          id_kecamatan: district.id,
          id_kelurahan: ward.id,
          id_provinsi: province,
          id_kota: city.id,
        };

        return {
          ...user,
          // id_member: await getAutoNumber("tbl_member", "id_member", "MBR", 6),
          // id_kecamatan: userDistrict.id,
          // id_kelurahan: userWard.id,
          // id_provinsi: userProv,
          // id_kota: userCity,
          ...domicile,
          password: await bcrypt.hash(user.password, 12),
          no_ktp: "0802020202101022",
          tgl_lahir: "1996-09-29",
          kode_pos: "123456",
        };
      })
    );

    await ModelMember.bulkCreate(members);

    res.status(200).json({
      status: true,
      message: "Berhasil ",
      members,
    });
  } catch (error) {
    console.log(error);
    throw new ResponseError(error.statusCode, error.message, error.errors);
  }
});
