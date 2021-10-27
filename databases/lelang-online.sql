-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2021 at 07:02 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lelang-online`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_admin` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_ktp` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama_admin`, `username`, `email`, `password`, `alamat`, `no_hp`, `no_ktp`, `tgl_lahir`, `foto`, `tgl_dibuat`, `tgl_diubah`) VALUES
('ADM001', 'admin', 'admin', 'admin@yahoo.com', '$2a$12$CggmH7YsTgQ/xezeBLr4COra69PulVEiZHuBZON5Buu5X.E/hbfmW', 'Jakarta', NULL, '0000000000000', NULL, NULL, '2021-10-24 11:58:10', '2021-10-24 11:58:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_akun_bank`
--

CREATE TABLE `tbl_akun_bank` (
  `id_akun` int(11) NOT NULL,
  `no_rek` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_rek` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_bank` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelMemberIdMember` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_member` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_akun_bank`
--

INSERT INTO `tbl_akun_bank` (`id_akun`, `no_rek`, `nama_rek`, `nama_bank`, `ModelMemberIdMember`, `id_member`) VALUES
(9, '224554455656', 'the unit', 'BRI', NULL, 'MBR001'),
(10, '17382030492', 'the unit', 'Mandiri', NULL, 'MBR001'),
(11, '48685067656', 'Unit 97', 'BNI', NULL, 'MBR003');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_detail_transaksi`
--

CREATE TABLE `tbl_detail_transaksi` (
  `_id` int(11) DEFAULT NULL,
  `id_detail_transaksi` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waktu_update` datetime DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelTransaksiIdTransaksi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_transaksi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_detail_transaksi`
--

INSERT INTO `tbl_detail_transaksi` (`_id`, `id_detail_transaksi`, `status`, `waktu_update`, `tgl_dibuat`, `tgl_diubah`, `ModelTransaksiIdTransaksi`, `id_transaksi`) VALUES
(1, 'INV271021001', '2', '2021-10-27 11:51:41', '2021-10-27 11:50:57', '2021-10-27 11:51:41', NULL, '2710210001');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_galeri_lelang`
--

CREATE TABLE `tbl_galeri_lelang` (
  `id_galeri` int(11) NOT NULL,
  `url` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelLelangIdLelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_galeri_lelang`
--

INSERT INTO `tbl_galeri_lelang` (`id_galeri`, `url`, `ModelLelangIdLelang`, `id_lelang`) VALUES
(112, '/uploads\\auctions\\BaeBid-Jujutsu-Kaisen-Cute-Chibi-Figures---Gojo-Satoru-A_1635307882111.jpg', NULL, '2710210001'),
(113, '/uploads\\auctions\\BaeBid-Sweater-Red_1635307958076.jfif', NULL, '2710210002'),
(114, '/uploads\\auctions\\BaeBid-Sweater-Red_1635307958077.jfif', NULL, '2710210002'),
(115, '/uploads\\auctions\\BaeBid-Sweater-Red_1635307958079.jfif', NULL, '2710210002'),
(116, '/uploads\\auctions\\BaeBid-Kursi-santai_1635308666681.jpg', NULL, '2710210003'),
(117, '/uploads\\auctions\\BaeBid-Kursi-santai_1635308666689.jpg', NULL, '2710210003'),
(118, '/uploads\\auctions\\BaeBid-Sofa_1635308828224.jpg', NULL, '2710210004'),
(119, '/uploads\\auctions\\BaeBid-Meja-maka-lesehan_1635308925482.jfif', NULL, '2710210005'),
(120, '/uploads\\auctions\\BaeBid-Luxury-Kamera_1635309189132.jpg', NULL, '2710210006'),
(121, '/uploads\\auctions\\BaeBid-Luxury-Kamera-Hitam_1635309255505.jpg', NULL, '2710210007'),
(122, '/uploads\\auctions\\BaeBid-Hard-Graft-Unpack-Leather-Handbag_1635309353963.jpg', NULL, '2710210008');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kategori`
--

CREATE TABLE `tbl_kategori` (
  `id_kategori` int(11) NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_kategori`
--

INSERT INTO `tbl_kategori` (`id_kategori`, `slug`, `kategori`) VALUES
(1, 'sepatu', 'Sepatu'),
(2, 'komputer', 'Komputer'),
(3, 'handphone-&-tablet', 'Handphone & Tablet'),
(4, 'perlengkapan-rumah', 'Perlengkapan Rumah'),
(5, 'dumbb', 'Dumb'),
(6, 'elektronik', 'Elektronik'),
(7, 'mainan', 'Mainan'),
(8, 'otomotif', 'Otomotif'),
(9, 'pakaian-dan-aksesoris', 'Pakaian & Aksesoris'),
(10, 'olahraga', 'Olahraga'),
(11, 'tas', 'Tas'),
(12, 'perlengkapan-kantor', 'Perlengkapan Kantor'),
(13, 'antik', 'Antik'),
(14, 'jam-dan-perhiasan', 'Jam & Perhiasan'),
(15, 'musik', 'Musik'),
(16, 'koleksi-dan-action-figure', 'Koleksi & Action Figure');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lelang`
--

CREATE TABLE `tbl_lelang` (
  `_id` int(11) DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `judul` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_brg` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hrg_awal` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kelipatan_hrg` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `batas_tawaran` int(11) DEFAULT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_mulai` datetime DEFAULT NULL,
  `tgl_selesai` datetime DEFAULT NULL,
  `status_lelang` int(11) DEFAULT 0,
  `alamat_barang` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jenis_pengiriman` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dimensi_brg` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biaya_packing` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelMemberIdMember` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_member` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `ModelKategoriIdKategori` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_lelang`
--

INSERT INTO `tbl_lelang` (`_id`, `id_lelang`, `judul`, `status_brg`, `hrg_awal`, `kelipatan_hrg`, `batas_tawaran`, `deskripsi`, `tgl_mulai`, `tgl_selesai`, `status_lelang`, `alamat_barang`, `jenis_pengiriman`, `dimensi_brg`, `biaya_packing`, `tgl_dibuat`, `tgl_diubah`, `ModelMemberIdMember`, `id_member`, `id_kategori`, `ModelKategoriIdKategori`) VALUES
(1, '2710210001', 'Jujutsu Kaisen Cute Chibi Figures - Gojo Satoru A', 'Seperti baru', '120.000', '3.000', 10, '<p>Jujutsu Kaisen Cute Chibi Figures - Gojo Satoru A</p>', '2021-10-27 11:11:23', '2021-11-03 11:10:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"10\",\"lebar\":\"10\",\"tinggi\":\"10\",\"berat\":\"400\"}', '5000', '2021-10-27 11:11:22', '2021-10-27 11:11:23', NULL, 'MBR001', 16, NULL),
(2, '2710210002', 'Sweater Red', '100% baru', '150.000', '3.000', 8, '<p>Sweater Red</p>', '2021-10-27 11:12:40', '2021-11-03 11:12:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"100\",\"lebar\":\"100\",\"tinggi\":\"130\",\"berat\":\"400\"}', '5000', '2021-10-27 11:12:38', '2021-10-27 11:12:40', NULL, 'MBR001', 9, NULL),
(3, '2710210003', 'Kursi santai', 'Bekas dengan kondisi baik', '90.000', '1.000', 11, '<p>Kursi santai warna hitam</p>', '2021-10-27 11:24:30', '2021-10-27 11:39:57', 3, '{\"id_provinsi\":\"31\",\"id_kota\":\"3171\",\"id_kecamatan\":\"3171010\",\"id_kelurahan\":\"3171010004\",\"alamat\":\"Jl ledakan surgawi no 97\",\"kode_pos\":\"13597\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"160\",\"lebar\":\"50\",\"tinggi\":\"200\",\"berat\":\"300\"}', '15000', '2021-10-27 11:24:26', '2021-10-27 11:40:49', NULL, 'MBR003', 4, NULL),
(4, '2710210004', 'Sofa', '100% baru', '800.000', '30.000', 6, '', '2021-10-27 11:27:11', '2021-11-03 11:26:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3171\",\"id_kecamatan\":\"3171010\",\"id_kelurahan\":\"3171010004\",\"alamat\":\"Jl ledakan surgawi no 97\",\"kode_pos\":\"13597\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"100\",\"tinggi\":\"60\",\"berat\":\"3600\"}', '20000', '2021-10-27 11:27:08', '2021-10-27 11:27:11', NULL, 'MBR003', 5, NULL),
(5, '2710210005', 'Meja maka lesehan', 'Seperti baru', '120.000', '3.000', 8, '', '2021-10-27 11:28:47', '2021-11-03 11:28:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"100\",\"lebar\":\"100\",\"tinggi\":\"130\",\"berat\":\"400\"}', '5000', '2021-10-27 11:28:45', '2021-10-27 11:28:47', NULL, 'MBR001', 4, NULL),
(6, '2710210006', 'Luxury Kamera', '100% baru', '1.000.000', '20.000', 10, '<p>Luxury Kamera warna silver</p>', '2021-10-27 11:33:10', '2021-11-03 11:32:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"20\",\"lebar\":\"25\",\"tinggi\":\"10\",\"berat\":\"100\"}', '5000', '2021-10-27 11:33:09', '2021-10-27 11:33:10', NULL, 'MBR001', 6, NULL),
(7, '2710210007', 'Luxury Kamera Hitam', '100% baru', '1.100.000', '20.000', 9, '<p>Luxury Kamera Hitam</p>', '2021-10-27 11:34:16', '2021-11-03 11:33:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"20\",\"lebar\":\"25\",\"tinggi\":\"10\",\"berat\":\"100\"}', '5000', '2021-10-27 11:34:15', '2021-10-27 11:34:16', NULL, 'MBR001', 6, NULL),
(8, '2710210008', 'Hard Graft Unpack Leather Handbag', '100% baru', '300.000', '10.000', 11, '<p>Hard Graft Unpack Leather Handbag Memegang Perlengkapan Penting Anda dengan Gaya</p>', '2021-10-27 11:35:56', '2021-11-03 11:35:00', 1, '{\"id_provinsi\":\"32\",\"id_kota\":\"3275\",\"id_kecamatan\":\"3275011\",\"id_kelurahan\":\"3275011002\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"20\",\"lebar\":\"20\",\"tinggi\":\"40\",\"berat\":\"100\"}', '5000', '2021-10-27 11:35:53', '2021-10-27 11:35:56', NULL, 'MBR001', 11, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_member`
--

CREATE TABLE `tbl_member` (
  `id_member` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode_pos` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_ktp` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_provinsi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kota` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kecamatan` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_kelurahan` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_member`
--

INSERT INTO `tbl_member` (`id_member`, `nama`, `username`, `email`, `password`, `alamat`, `kode_pos`, `no_hp`, `no_ktp`, `id_provinsi`, `id_kota`, `id_kecamatan`, `id_kelurahan`, `tgl_lahir`, `foto`, `tgl_dibuat`, `tgl_diubah`) VALUES
('MBR001', 'unit', 'theunit', 'unit@gmail.com', '$2a$12$btXtGEjTDwlSIS9/xj0Ya.mWLXraaWZOCqiyP8jdQat6OytKnTQzK', 'Jl. Nurul Iman 6 No.127, RT.006/RW.001', '17145', '081244967969', '0802020202101022', '32', '3275', '3275011', '3275011002', '1996-05-28', 'uploads\\members\\Baebid-MBR001_2021-10-27-110503.jpg', '2021-10-27 10:56:17', '2021-10-27 11:07:44'),
('MBR002', 'unit 96', 'unit 96', 'unit96@gmail.com', '$2a$12$2la36o2hIxPnLuBMYtZ.8e5gfbXIJ3aGVd09E5GpWkaROy4L0UdH2', NULL, NULL, '089696969696', NULL, NULL, NULL, NULL, NULL, NULL, 'uploads\\members\\Baebid-MBR002_2021-10-27-111503.jpg', '2021-10-27 11:14:18', '2021-10-27 11:15:03'),
('MBR003', 'Unit 97', 'Unit 97', 'unit97@gmail.com', '$2a$12$ld/x8iNuZh42RFW99CqcnOdvUaMQSQ8oicZQ3pran7YlptHbzt7am', 'Jl ledakan surgawi no 97', '13597', '081310750003', '0802020202101022', '31', '3171', '3171010', '3171010004', '1996-05-28', 'uploads\\members\\Baebid-MBR003_2021-10-27-111929.jpg', '2021-10-27 11:18:42', '2021-10-27 11:20:23');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pengiriman`
--

CREATE TABLE `tbl_pengiriman` (
  `id_pengiriman` int(11) NOT NULL,
  `status` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dikirim` datetime DEFAULT NULL,
  `tgl_diterima` datetime DEFAULT NULL,
  `no_resi` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelTransaksiIdTransaksi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_transaksi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_pengiriman`
--

INSERT INTO `tbl_pengiriman` (`id_pengiriman`, `status`, `tgl_dikirim`, `tgl_diterima`, `no_resi`, `tgl_dibuat`, `tgl_diubah`, `ModelTransaksiIdTransaksi`, `id_transaksi`) VALUES
(8, '1', '2021-10-27 11:51:26', NULL, '127388383909', '2021-10-27 11:51:26', '2021-10-27 11:51:41', NULL, '2710210001');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pesan_diskusi`
--

CREATE TABLE `tbl_pesan_diskusi` (
  `id_pesan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isi_pesan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_parent` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelMemberIdMember` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_member` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelRuangDiskusiIdRuang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_ruang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_pesan_diskusi`
--

INSERT INTO `tbl_pesan_diskusi` (`id_pesan`, `isi_pesan`, `id_parent`, `tgl_dibuat`, `tgl_diubah`, `ModelMemberIdMember`, `id_member`, `ModelRuangDiskusiIdRuang`, `id_ruang`) VALUES
('171d0480-184c-4c61-82bb-57f7a6a3d468', 'haha', 'c1d27504-aa09-461c-9626-b84b69d8ed18', '2021-10-27 11:39:16', '2021-10-27 11:39:16', NULL, 'MBR002', NULL, '854c5d8f-cbf3-4699-b589-ad2650953a7d'),
('171df0ca-f9ea-45d4-87a1-c61d86f0779c', 'i lose ', NULL, '2021-10-27 11:40:31', '2021-10-27 11:40:31', NULL, 'MBR002', NULL, '854c5d8f-cbf3-4699-b589-ad2650953a7d'),
('49b84916-7b57-43b4-b8f9-6bd677c02298', 'Upp', NULL, '2021-10-27 11:14:32', '2021-10-27 11:14:32', NULL, 'MBR002', NULL, 'a72ea5f1-3ad6-427e-af55-1df6922410fb'),
('58885aab-47a2-422b-9771-1480bda301dd', 'upp', NULL, '2021-10-27 11:15:22', '2021-10-27 11:15:22', NULL, 'MBR001', NULL, 'a72ea5f1-3ad6-427e-af55-1df6922410fb'),
('a0270017-89dc-4d0a-8aba-7b57068754df', 'nt', '171df0ca-f9ea-45d4-87a1-c61d86f0779c', '2021-10-27 11:40:39', '2021-10-27 11:40:39', NULL, 'MBR001', NULL, '854c5d8f-cbf3-4699-b589-ad2650953a7d'),
('c1d27504-aa09-461c-9626-b84b69d8ed18', 'hmm', NULL, '2021-10-27 11:38:52', '2021-10-27 11:38:52', NULL, 'MBR001', NULL, '854c5d8f-cbf3-4699-b589-ad2650953a7d');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ruang_diskusi`
--

CREATE TABLE `tbl_ruang_diskusi` (
  `id_ruang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ModelLelangIdLelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_ruang_diskusi`
--

INSERT INTO `tbl_ruang_diskusi` (`id_ruang`, `ModelLelangIdLelang`, `id_lelang`) VALUES
('854c5d8f-cbf3-4699-b589-ad2650953a7d', NULL, '2710210003'),
('a72ea5f1-3ad6-427e-af55-1df6922410fb', NULL, '2710210002');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tawaran`
--

CREATE TABLE `tbl_tawaran` (
  `id_tawaran` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_tawaran` int(11) DEFAULT NULL,
  `nilai_tawaran` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_tawaran` datetime NOT NULL,
  `ModelLelangIdLelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelMemberIdMember` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_member` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_tawaran`
--

INSERT INTO `tbl_tawaran` (`id_tawaran`, `status_tawaran`, `nilai_tawaran`, `tgl_tawaran`, `ModelLelangIdLelang`, `id_lelang`, `ModelMemberIdMember`, `id_member`) VALUES
('BID0001', 0, '159000', '2021-10-27 11:37:27', NULL, '2710210002', NULL, 'MBR002'),
('BID0002', 0, '95000', '2021-10-27 11:37:59', NULL, '2710210003', NULL, 'MBR002'),
('BID0003', 0, '100000', '2021-10-27 11:38:14', NULL, '2710210003', NULL, 'MBR001'),
('BID0004', 0, '105000', '2021-10-27 11:38:36', NULL, '2710210003', NULL, 'MBR002'),
('BID0005', 1, '110000', '2021-10-27 11:39:28', NULL, '2710210003', NULL, 'MBR001');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaksi`
--

CREATE TABLE `tbl_transaksi` (
  `_id` int(11) DEFAULT NULL,
  `id_transaksi` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_penerima` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nohp_penerima` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat_tujuan` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_harga` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_bayar` int(11) DEFAULT NULL,
  `tgl_bayar` datetime DEFAULT NULL,
  `bukti_transfer` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `batas_waktu_bayar` datetime DEFAULT NULL,
  `jenis_pengiriman` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ongkir` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status_transaksi` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelPenawaranIdTawaran` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tawaran` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_transaksi`
--

INSERT INTO `tbl_transaksi` (`_id`, `id_transaksi`, `nama_penerima`, `nohp_penerima`, `alamat_tujuan`, `total_harga`, `status_bayar`, `tgl_bayar`, `bukti_transfer`, `batas_waktu_bayar`, `jenis_pengiriman`, `ongkir`, `status_transaksi`, `tgl_dibuat`, `tgl_diubah`, `ModelPenawaranIdTawaran`, `id_tawaran`) VALUES
(1, '2710210001', 'unit', '081244967969', '{\"provinsi\":\"Jawa Barat\",\"kota\":\"Kota Bekasi\",\"kecamatan\":\"Jatisampurna\",\"kelurahan\":\"Jatisampurna\",\"alamat\":\"Jl. Nurul Iman 6 No.127, RT.006/RW.001\",\"kode_pos\":\"17145\"}', '147000', 2, '2021-10-27 11:50:57', '{\"bank_tujuan\":{\"id_akun\":11,\"no_rek\":\"48685067656\",\"nama_rek\":\"Unit 97\",\"nama_bank\":\"BNI\",\"id_member\":\"MBR003\"},\"bukti\":\"/uploads\\\\payments\\\\BaeBid-2710210001_2021-10-27.jpg\"}', '2021-10-28 11:41:41', 'COURIER_SERVICE', '22000', '5', '2021-10-27 11:40:49', '2021-10-27 11:51:41', NULL, 'BID0005');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  ADD PRIMARY KEY (`id_akun`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `tbl_detail_transaksi`
--
ALTER TABLE `tbl_detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelTransaksiIdTransaksi` (`ModelTransaksiIdTransaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  ADD PRIMARY KEY (`id_galeri`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`);

--
-- Indexes for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `tbl_lelang`
--
ALTER TABLE `tbl_lelang`
  ADD PRIMARY KEY (`id_lelang`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_kategori` (`id_kategori`),
  ADD KEY `ModelKategoriIdKategori` (`ModelKategoriIdKategori`);

--
-- Indexes for table `tbl_member`
--
ALTER TABLE `tbl_member`
  ADD PRIMARY KEY (`id_member`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `ModelTransaksiIdTransaksi` (`ModelTransaksiIdTransaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `tbl_pesan_diskusi`
--
ALTER TABLE `tbl_pesan_diskusi`
  ADD PRIMARY KEY (`id_pesan`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `ModelRuangDiskusiIdRuang` (`ModelRuangDiskusiIdRuang`),
  ADD KEY `id_ruang` (`id_ruang`);

--
-- Indexes for table `tbl_ruang_diskusi`
--
ALTER TABLE `tbl_ruang_diskusi`
  ADD PRIMARY KEY (`id_ruang`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`);

--
-- Indexes for table `tbl_tawaran`
--
ALTER TABLE `tbl_tawaran`
  ADD PRIMARY KEY (`id_tawaran`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`);

--
-- Indexes for table `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD UNIQUE KEY `id_transaksi` (`id_transaksi`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelPenawaranIdTawaran` (`ModelPenawaranIdTawaran`),
  ADD KEY `id_tawaran` (`id_tawaran`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  MODIFY `id_akun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  MODIFY `id_galeri` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  ADD CONSTRAINT `tbl_akun_bank_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_akun_bank_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_detail_transaksi`
--
ALTER TABLE `tbl_detail_transaksi`
  ADD CONSTRAINT `tbl_detail_transaksi_ibfk_1` FOREIGN KEY (`ModelTransaksiIdTransaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_detail_transaksi_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  ADD CONSTRAINT `tbl_galeri_lelang_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_galeri_lelang_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_lelang`
--
ALTER TABLE `tbl_lelang`
  ADD CONSTRAINT `tbl_lelang_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_3` FOREIGN KEY (`id_kategori`) REFERENCES `tbl_kategori` (`id_kategori`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_4` FOREIGN KEY (`ModelKategoriIdKategori`) REFERENCES `tbl_kategori` (`id_kategori`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  ADD CONSTRAINT `tbl_pengiriman_ibfk_1` FOREIGN KEY (`ModelTransaksiIdTransaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pengiriman_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_pesan_diskusi`
--
ALTER TABLE `tbl_pesan_diskusi`
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_3` FOREIGN KEY (`ModelRuangDiskusiIdRuang`) REFERENCES `tbl_ruang_diskusi` (`id_ruang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_4` FOREIGN KEY (`id_ruang`) REFERENCES `tbl_ruang_diskusi` (`id_ruang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_ruang_diskusi`
--
ALTER TABLE `tbl_ruang_diskusi`
  ADD CONSTRAINT `tbl_ruang_diskusi_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_ruang_diskusi_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_tawaran`
--
ALTER TABLE `tbl_tawaran`
  ADD CONSTRAINT `tbl_tawaran_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_3` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_4` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  ADD CONSTRAINT `tbl_transaksi_ibfk_1` FOREIGN KEY (`ModelPenawaranIdTawaran`) REFERENCES `tbl_tawaran` (`id_tawaran`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_transaksi_ibfk_2` FOREIGN KEY (`id_tawaran`) REFERENCES `tbl_tawaran` (`id_tawaran`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
