-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 24 Agu 2021 pada 18.16
-- Versi server: 8.0.25-0ubuntu0.20.04.1
-- Versi PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Struktur dari tabel `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id_admin` varchar(20) NOT NULL,
  `nama_admin` varchar(50) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `alamat` text,
  `no_hp` varchar(20) DEFAULT NULL,
  `no_ktp` varchar(16) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama_admin`, `username`, `email`, `password`, `alamat`, `no_hp`, `no_ktp`, `tgl_lahir`, `foto`, `tgl_dibuat`, `tgl_diubah`) VALUES
('ADM001', 'Admin', 'Admin', 'admin@gmail.com', '$2a$12$U0h1AV58H.i7F8jNfBYWh.DQSI1.fwP5ok3rMzRGZgZ40BQOfFchG', NULL, '081310750003', NULL, NULL, NULL, '2021-08-22 16:31:02', '2021-08-22 16:31:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_akun_bank`
--

CREATE TABLE `tbl_akun_bank` (
  `id_akun` int NOT NULL,
  `no_rek` varchar(25) DEFAULT NULL,
  `nama_rek` varchar(50) DEFAULT NULL,
  `nama_bank` varchar(25) DEFAULT NULL,
  `ModelMemberIdMember` varchar(10) DEFAULT NULL,
  `id_member` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_detail_transaksi`
--

CREATE TABLE `tbl_detail_transaksi` (
  `_id` int DEFAULT NULL,
  `id_detail_transaksi` varchar(12) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `waktu_update` datetime DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelTransaksiIdTransaksi` varchar(11) DEFAULT NULL,
  `id_transaksi` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_detail_transaksi`
--

INSERT INTO `tbl_detail_transaksi` (`_id`, `id_detail_transaksi`, `status`, `waktu_update`, `tgl_dibuat`, `tgl_diubah`, `ModelTransaksiIdTransaksi`, `id_transaksi`) VALUES
(1, 'INV230821001', '0', NULL, '2021-08-23 22:13:12', '2021-08-23 22:28:46', NULL, '2308210002');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_galeri_lelang`
--

CREATE TABLE `tbl_galeri_lelang` (
  `id_galeri` int NOT NULL,
  `url` varchar(128) DEFAULT NULL,
  `ModelLelangIdLelang` varchar(11) DEFAULT NULL,
  `id_lelang` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_kategori`
--

CREATE TABLE `tbl_kategori` (
  `id_kategori` int NOT NULL,
  `slug` varchar(128) DEFAULT NULL,
  `kategori` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_kategori`
--

INSERT INTO `tbl_kategori` (`id_kategori`, `slug`, `kategori`) VALUES
(1, 'sepatu', 'Sepatu'),
(2, 'komputer', 'Komputer'),
(3, 'handphone-&-tablet', 'Handphone & Tablet'),
(4, 'perlengkapan-rumah', 'Perlengkapan Rumah'),
(5, 'dumb', 'Dumb'),
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
-- Struktur dari tabel `tbl_lelang`
--

CREATE TABLE `tbl_lelang` (
  `_id` int DEFAULT NULL,
  `id_lelang` varchar(11) NOT NULL,
  `judul` varchar(50) DEFAULT NULL,
  `status_brg` varchar(30) DEFAULT NULL,
  `hrg_awal` varchar(30) DEFAULT NULL,
  `kelipatan_hrg` varchar(20) DEFAULT NULL,
  `batas_tawaran` int DEFAULT NULL,
  `deskripsi` text,
  `tgl_mulai` datetime DEFAULT NULL,
  `tgl_selesai` datetime DEFAULT NULL,
  `status_lelang` int DEFAULT '0',
  `alamat_barang` varchar(255) DEFAULT NULL,
  `jenis_pengiriman` varchar(128) DEFAULT NULL,
  `dimensi_brg` varchar(128) DEFAULT NULL,
  `biaya_packing` varchar(30) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelMemberIdMember` varchar(10) DEFAULT NULL,
  `id_member` varchar(11) DEFAULT NULL,
  `id_kategori` int DEFAULT NULL,
  `ModelKategoriIdKategori` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_member`
--

CREATE TABLE `tbl_member` (
  `id_member` varchar(10) NOT NULL,
  `nama` varchar(50) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `alamat` text,
  `kode_pos` varchar(10) DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `no_ktp` varchar(16) DEFAULT NULL,
  `id_provinsi` varchar(11) DEFAULT NULL,
  `id_kota` varchar(11) DEFAULT NULL,
  `id_kecamatan` varchar(15) DEFAULT NULL,
  `id_kelurahan` varchar(20) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pengiriman`
--

CREATE TABLE `tbl_pengiriman` (
  `id_pengiriman` int NOT NULL,
  `status` varchar(25) DEFAULT NULL,
  `tgl_dikirim` datetime DEFAULT NULL,
  `tgl_diterima` datetime DEFAULT NULL,
  `no_resi` varchar(128) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelTransaksiIdTransaksi` varchar(11) DEFAULT NULL,
  `id_transaksi` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pesan_diskusi`
--

CREATE TABLE `tbl_pesan_diskusi` (
  `id_pesan` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `isi_pesan` text,
  `id_parent` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelMemberIdMember` varchar(10) DEFAULT NULL,
  `id_member` varchar(11) DEFAULT NULL,
  `ModelRuangDiskusiIdRuang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_ruang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_ruang_diskusi`
--

CREATE TABLE `tbl_ruang_diskusi` (
  `id_ruang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ModelLelangIdLelang` varchar(11) DEFAULT NULL,
  `id_lelang` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_ruang_diskusi`
--

INSERT INTO `tbl_ruang_diskusi` (`id_ruang`, `ModelLelangIdLelang`, `id_lelang`) VALUES
('0519c09c-4e84-467f-b646-06bbe3c91819', NULL, NULL),
('4fb5e79d-ded9-4550-957f-ce8b786dad41', NULL, NULL),
('83da97fa-90ef-4bef-bdc1-3dfb9e0cb6ad', NULL, NULL),
('914ff8f8-643a-474e-83ba-58ea28377d49', NULL, NULL),
('9ae7efee-8def-492c-9c64-219922b621a4', NULL, NULL),
('add877b8-29e1-4a45-a72c-a89cc1641767', NULL, NULL),
('af8e4b33-6c88-4824-b1d0-6328874232c5', NULL, NULL),
('c7866192-54e3-4759-985b-376b9445aaf1', NULL, NULL),
('ff2c568f-0612-4670-a97c-e57a5827149d', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_tawaran`
--

CREATE TABLE `tbl_tawaran` (
  `id_tawaran` varchar(7) NOT NULL,
  `status_tawaran` int DEFAULT NULL,
  `nilai_tawaran` varchar(255) DEFAULT NULL,
  `tgl_tawaran` datetime NOT NULL,
  `ModelLelangIdLelang` varchar(11) DEFAULT NULL,
  `id_lelang` varchar(11) DEFAULT NULL,
  `ModelMemberIdMember` varchar(10) DEFAULT NULL,
  `id_member` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_tawaran`
--

INSERT INTO `tbl_tawaran` (`id_tawaran`, `status_tawaran`, `nilai_tawaran`, `tgl_tawaran`, `ModelLelangIdLelang`, `id_lelang`, `ModelMemberIdMember`, `id_member`) VALUES
('BID0001', 0, '190.000', '2021-08-22 16:51:13', NULL, NULL, NULL, NULL),
('BID0002', 0, '210.000', '2021-08-22 16:51:17', NULL, NULL, NULL, NULL),
('BID0003', 1, '140.000', '2021-08-23 22:06:46', NULL, NULL, NULL, NULL),
('BID0004', 1, '200.000', '2021-08-23 22:09:05', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_transaksi`
--

CREATE TABLE `tbl_transaksi` (
  `_id` int DEFAULT NULL,
  `id_transaksi` varchar(11) NOT NULL,
  `nama_penerima` varchar(50) DEFAULT NULL,
  `nohp_penerima` varchar(20) DEFAULT NULL,
  `alamat_tujuan` text,
  `total_harga` varchar(20) DEFAULT NULL,
  `status_bayar` int DEFAULT NULL,
  `tgl_bayar` datetime DEFAULT NULL,
  `bukti_transfer` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `batas_waktu_bayar` datetime DEFAULT NULL,
  `jenis_pengiriman` varchar(30) DEFAULT NULL,
  `ongkir` varchar(20) DEFAULT NULL,
  `status_transaksi` varchar(11) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelPenawaranIdTawaran` varchar(7) DEFAULT NULL,
  `id_tawaran` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_transaksi`
--

INSERT INTO `tbl_transaksi` (`_id`, `id_transaksi`, `nama_penerima`, `nohp_penerima`, `alamat_tujuan`, `total_harga`, `status_bayar`, `tgl_bayar`, `bukti_transfer`, `batas_waktu_bayar`, `jenis_pengiriman`, `ongkir`, `status_transaksi`, `tgl_dibuat`, `tgl_diubah`, `ModelPenawaranIdTawaran`, `id_tawaran`) VALUES
(1, '2308210001', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, '0', '2021-08-23 22:07:43', '2021-08-23 22:07:43', NULL, 'BID0003'),
(2, '2308210002', 'unit', '085433336666', '{\"provinsi\":\"Jawa Barat\",\"kota\":\"Kota Bekasi\",\"kecamatan\":\"Pondokgede\",\"kelurahan\":\"Jatimakmur\",\"alamat\":\"user address\",\"kode_pos\":\"123456\"}', '260000', 0, '2021-08-23 22:28:46', '{\"bank_tujuan\":{\"id_akun\":1,\"no_rek\":\"48659430003\",\"nama_rek\":\"Momo\",\"nama_bank\":\"Mandiri\",\"id_member\":\"MBR005\"},\"bukti\":\"/uploads/payments/BaeBid-2308210002_2021-08-23.jfif\"}', '2021-08-24 22:11:56', 'COURIER_SERVICE', '40000', '2', '2021-08-23 22:10:42', '2021-08-23 22:28:46', NULL, 'BID0004');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  ADD PRIMARY KEY (`id_akun`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`);

--
-- Indeks untuk tabel `tbl_detail_transaksi`
--
ALTER TABLE `tbl_detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelTransaksiIdTransaksi` (`ModelTransaksiIdTransaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indeks untuk tabel `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  ADD PRIMARY KEY (`id_galeri`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`);

--
-- Indeks untuk tabel `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `tbl_lelang`
--
ALTER TABLE `tbl_lelang`
  ADD PRIMARY KEY (`id_lelang`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_kategori` (`id_kategori`),
  ADD KEY `ModelKategoriIdKategori` (`ModelKategoriIdKategori`);

--
-- Indeks untuk tabel `tbl_member`
--
ALTER TABLE `tbl_member`
  ADD PRIMARY KEY (`id_member`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `ModelTransaksiIdTransaksi` (`ModelTransaksiIdTransaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indeks untuk tabel `tbl_pesan_diskusi`
--
ALTER TABLE `tbl_pesan_diskusi`
  ADD PRIMARY KEY (`id_pesan`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `ModelRuangDiskusiIdRuang` (`ModelRuangDiskusiIdRuang`),
  ADD KEY `id_ruang` (`id_ruang`);

--
-- Indeks untuk tabel `tbl_ruang_diskusi`
--
ALTER TABLE `tbl_ruang_diskusi`
  ADD PRIMARY KEY (`id_ruang`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`);

--
-- Indeks untuk tabel `tbl_tawaran`
--
ALTER TABLE `tbl_tawaran`
  ADD PRIMARY KEY (`id_tawaran`),
  ADD KEY `ModelLelangIdLelang` (`ModelLelangIdLelang`),
  ADD KEY `id_lelang` (`id_lelang`),
  ADD KEY `ModelMemberIdMember` (`ModelMemberIdMember`),
  ADD KEY `id_member` (`id_member`);

--
-- Indeks untuk tabel `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD UNIQUE KEY `id_transaksi` (`id_transaksi`),
  ADD UNIQUE KEY `_id` (`_id`),
  ADD KEY `ModelPenawaranIdTawaran` (`ModelPenawaranIdTawaran`),
  ADD KEY `id_tawaran` (`id_tawaran`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  MODIFY `id_akun` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  MODIFY `id_galeri` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT untuk tabel `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `id_kategori` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  MODIFY `id_pengiriman` int NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `tbl_akun_bank`
--
ALTER TABLE `tbl_akun_bank`
  ADD CONSTRAINT `tbl_akun_bank_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_akun_bank_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_detail_transaksi`
--
ALTER TABLE `tbl_detail_transaksi`
  ADD CONSTRAINT `tbl_detail_transaksi_ibfk_1` FOREIGN KEY (`ModelTransaksiIdTransaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_detail_transaksi_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  ADD CONSTRAINT `tbl_galeri_lelang_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_galeri_lelang_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_lelang`
--
ALTER TABLE `tbl_lelang`
  ADD CONSTRAINT `tbl_lelang_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_3` FOREIGN KEY (`id_kategori`) REFERENCES `tbl_kategori` (`id_kategori`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_lelang_ibfk_4` FOREIGN KEY (`ModelKategoriIdKategori`) REFERENCES `tbl_kategori` (`id_kategori`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  ADD CONSTRAINT `tbl_pengiriman_ibfk_1` FOREIGN KEY (`ModelTransaksiIdTransaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pengiriman_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `tbl_transaksi` (`id_transaksi`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_pesan_diskusi`
--
ALTER TABLE `tbl_pesan_diskusi`
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_1` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_3` FOREIGN KEY (`ModelRuangDiskusiIdRuang`) REFERENCES `tbl_ruang_diskusi` (`id_ruang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_pesan_diskusi_ibfk_4` FOREIGN KEY (`id_ruang`) REFERENCES `tbl_ruang_diskusi` (`id_ruang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_ruang_diskusi`
--
ALTER TABLE `tbl_ruang_diskusi`
  ADD CONSTRAINT `tbl_ruang_diskusi_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_ruang_diskusi_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_tawaran`
--
ALTER TABLE `tbl_tawaran`
  ADD CONSTRAINT `tbl_tawaran_ibfk_1` FOREIGN KEY (`ModelLelangIdLelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_2` FOREIGN KEY (`id_lelang`) REFERENCES `tbl_lelang` (`id_lelang`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_3` FOREIGN KEY (`ModelMemberIdMember`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_tawaran_ibfk_4` FOREIGN KEY (`id_member`) REFERENCES `tbl_member` (`id_member`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  ADD CONSTRAINT `tbl_transaksi_ibfk_1` FOREIGN KEY (`ModelPenawaranIdTawaran`) REFERENCES `tbl_tawaran` (`id_tawaran`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_transaksi_ibfk_2` FOREIGN KEY (`id_tawaran`) REFERENCES `tbl_tawaran` (`id_tawaran`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
