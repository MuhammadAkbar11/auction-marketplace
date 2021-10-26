-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 26 Okt 2021 pada 10.45
-- Versi server: 10.6.4-MariaDB
-- Versi PHP: 8.0.11

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
-- Struktur dari tabel `tbl_admin`
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
-- Dumping data untuk tabel `tbl_admin`
--

INSERT INTO `tbl_admin` (`id_admin`, `nama_admin`, `username`, `email`, `password`, `alamat`, `no_hp`, `no_ktp`, `tgl_lahir`, `foto`, `tgl_dibuat`, `tgl_diubah`) VALUES
('ADM001', 'admin', 'admin', 'admin@yahoo.com', '$2a$12$CggmH7YsTgQ/xezeBLr4COra69PulVEiZHuBZON5Buu5X.E/hbfmW', 'Jakarta', NULL, '0000000000000', NULL, NULL, '2021-10-24 11:58:10', '2021-10-24 11:58:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_akun_bank`
--

CREATE TABLE `tbl_akun_bank` (
  `id_akun` int(11) NOT NULL,
  `no_rek` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_rek` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nama_bank` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelMemberIdMember` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_member` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_detail_transaksi`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_galeri_lelang`
--

CREATE TABLE `tbl_galeri_lelang` (
  `id_galeri` int(11) NOT NULL,
  `url` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ModelLelangIdLelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_kategori`
--

CREATE TABLE `tbl_kategori` (
  `id_kategori` int(11) NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kategori` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `tbl_kategori`
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
-- Struktur dari tabel `tbl_lelang`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_member`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pengiriman`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pesan_diskusi`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_ruang_diskusi`
--

CREATE TABLE `tbl_ruang_diskusi` (
  `id_ruang` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `ModelLelangIdLelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_lelang` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_tawaran`
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_transaksi`
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
  MODIFY `id_akun` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `tbl_galeri_lelang`
--
ALTER TABLE `tbl_galeri_lelang`
  MODIFY `id_galeri` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT untuk tabel `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `tbl_pengiriman`
--
ALTER TABLE `tbl_pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
