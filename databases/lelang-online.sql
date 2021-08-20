-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 20 Agu 2021 pada 19.11
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
  `nama_admin` varchar(128) DEFAULT NULL,
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
('ADM001', 'unit', 'unit', 'unit@gmail.com', '$2a$12$sLc6e20oGdDOWHMvrlsGmeN0m3nuyoF.BRdeLeyYuJPwANWygZJJG', NULL, '081310750003', NULL, NULL, NULL, '2021-08-18 09:59:02', '2021-08-18 09:59:02'),
('ADM002', 'unit2', 'unit2', 'uni2t@gmail.com', '$2a$12$RXFIVpD0D.8SYTYdUKCVROqFHFmW/eARohHkB/lvokDpvsiScjqtS', NULL, '081310750003', NULL, NULL, NULL, '2021-08-18 10:15:56', '2021-08-18 10:15:56');

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

--
-- Dumping data untuk tabel `tbl_akun_bank`
--

INSERT INTO `tbl_akun_bank` (`id_akun`, `no_rek`, `nama_rek`, `nama_bank`, `ModelMemberIdMember`, `id_member`) VALUES
(1, '48659430003', 'unit 02', 'BRI', NULL, 'MBR001');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_detail_transaksi`
--

CREATE TABLE `tbl_detail_transaksi` (
  `_id` int DEFAULT NULL,
  `id_detail_transaksi` varchar(12) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `waktu_update` datetime DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelTransaksiIdTransaksi` varchar(11) DEFAULT NULL,
  `id_transaksi` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_galeri_lelang`
--

CREATE TABLE `tbl_galeri_lelang` (
  `id_galeri` int NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ModelLelangIdLelang` varchar(11) DEFAULT NULL,
  `id_lelang` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_galeri_lelang`
--

INSERT INTO `tbl_galeri_lelang` (`id_galeri`, `url`, `ModelLelangIdLelang`, `id_lelang`) VALUES
(1, '/uploads/auctions/BaeBid-Kursi_1629291895653.jpeg', NULL, '1808210001'),
(2, '/uploads/auctions/BaeBid-aaaa_1629304517680.png', NULL, '1808210002'),
(238, '/uploads/auctions/default.jpg', NULL, '1908210003'),
(239, '/uploads/auctions/default.jpg', NULL, '1908210003'),
(240, '/uploads/auctions/default.jpg', NULL, '1908210003'),
(241, '/uploads/auctions/default.jpg', NULL, '1908210003'),
(242, '/uploads/auctions/default.jpg', NULL, '1908210003'),
(243, '/uploads/auctions/default.jpg', NULL, '1908210004'),
(244, '/uploads/auctions/default.jpg', NULL, '1908210004'),
(245, '/uploads/auctions/default.jpg', NULL, '1908210004'),
(246, '/uploads/auctions/default.jpg', NULL, '1908210004'),
(247, '/uploads/auctions/default.jpg', NULL, '1908210004'),
(248, '/uploads/auctions/default.jpg', NULL, '1908210005'),
(249, '/uploads/auctions/default.jpg', NULL, '1908210005'),
(250, '/uploads/auctions/default.jpg', NULL, '1908210005'),
(251, '/uploads/auctions/default.jpg', NULL, '1908210005'),
(252, '/uploads/auctions/default.jpg', NULL, '1908210005'),
(253, '/uploads/auctions/default.jpg', NULL, '1908210006'),
(254, '/uploads/auctions/default.jpg', NULL, '1908210006'),
(255, '/uploads/auctions/default.jpg', NULL, '1908210006'),
(256, '/uploads/auctions/default.jpg', NULL, '1908210006'),
(257, '/uploads/auctions/default.jpg', NULL, '1908210006'),
(258, '/uploads/auctions/default.jpg', NULL, '1908210007'),
(259, '/uploads/auctions/default.jpg', NULL, '1908210007'),
(260, '/uploads/auctions/default.jpg', NULL, '1908210007'),
(261, '/uploads/auctions/default.jpg', NULL, '1908210007'),
(262, '/uploads/auctions/default.jpg', NULL, '1908210007'),
(263, '/uploads/auctions/default.jpg', NULL, '1908210008'),
(264, '/uploads/auctions/default.jpg', NULL, '1908210008'),
(265, '/uploads/auctions/default.jpg', NULL, '1908210008'),
(266, '/uploads/auctions/default.jpg', NULL, '1908210008'),
(267, '/uploads/auctions/default.jpg', NULL, '1908210008'),
(268, '/uploads/auctions/default.jpg', NULL, '190821009'),
(269, '/uploads/auctions/default.jpg', NULL, '190821009'),
(270, '/uploads/auctions/default.jpg', NULL, '190821009'),
(271, '/uploads/auctions/default.jpg', NULL, '190821009'),
(272, '/uploads/auctions/default.jpg', NULL, '190821009'),
(273, '/uploads/auctions/default.jpg', NULL, '1908210010'),
(274, '/uploads/auctions/default.jpg', NULL, '1908210010'),
(275, '/uploads/auctions/default.jpg', NULL, '1908210010'),
(276, '/uploads/auctions/default.jpg', NULL, '1908210010'),
(277, '/uploads/auctions/default.jpg', NULL, '1908210010'),
(278, '/uploads/auctions/default.jpg', NULL, '1908210011'),
(279, '/uploads/auctions/default.jpg', NULL, '1908210011'),
(280, '/uploads/auctions/default.jpg', NULL, '1908210011'),
(281, '/uploads/auctions/default.jpg', NULL, '1908210011'),
(282, '/uploads/auctions/default.jpg', NULL, '1908210011'),
(283, '/uploads/auctions/default.jpg', NULL, '1908210012'),
(284, '/uploads/auctions/default.jpg', NULL, '1908210012'),
(285, '/uploads/auctions/default.jpg', NULL, '1908210012'),
(286, '/uploads/auctions/default.jpg', NULL, '1908210012'),
(287, '/uploads/auctions/default.jpg', NULL, '1908210012'),
(288, '/uploads/auctions/default.jpg', NULL, '1908210013'),
(289, '/uploads/auctions/default.jpg', NULL, '1908210013'),
(290, '/uploads/auctions/default.jpg', NULL, '1908210013'),
(291, '/uploads/auctions/default.jpg', NULL, '1908210013'),
(292, '/uploads/auctions/default.jpg', NULL, '1908210013'),
(293, '/uploads/auctions/default.jpg', NULL, '1908210014'),
(294, '/uploads/auctions/default.jpg', NULL, '1908210014'),
(295, '/uploads/auctions/default.jpg', NULL, '1908210014'),
(296, '/uploads/auctions/default.jpg', NULL, '1908210014'),
(297, '/uploads/auctions/default.jpg', NULL, '1908210014'),
(298, '/uploads/auctions/default.jpg', NULL, '1908210015'),
(299, '/uploads/auctions/default.jpg', NULL, '1908210015'),
(300, '/uploads/auctions/default.jpg', NULL, '1908210015'),
(301, '/uploads/auctions/default.jpg', NULL, '1908210015'),
(302, '/uploads/auctions/default.jpg', NULL, '1908210015'),
(303, '/uploads/auctions/default.jpg', NULL, '1908210016'),
(304, '/uploads/auctions/default.jpg', NULL, '1908210016'),
(305, '/uploads/auctions/default.jpg', NULL, '1908210016'),
(306, '/uploads/auctions/default.jpg', NULL, '1908210016'),
(307, '/uploads/auctions/default.jpg', NULL, '1908210016'),
(308, '/uploads/auctions/default.jpg', NULL, '1908210017'),
(309, '/uploads/auctions/default.jpg', NULL, '1908210017'),
(310, '/uploads/auctions/default.jpg', NULL, '1908210017'),
(311, '/uploads/auctions/default.jpg', NULL, '1908210017'),
(312, '/uploads/auctions/default.jpg', NULL, '1908210017'),
(313, '/uploads/auctions/default.jpg', NULL, '1908210018'),
(314, '/uploads/auctions/default.jpg', NULL, '1908210018'),
(315, '/uploads/auctions/default.jpg', NULL, '1908210018'),
(316, '/uploads/auctions/default.jpg', NULL, '1908210018'),
(317, '/uploads/auctions/default.jpg', NULL, '1908210018'),
(318, '/uploads/auctions/default.jpg', NULL, '1908210019'),
(319, '/uploads/auctions/default.jpg', NULL, '1908210019'),
(320, '/uploads/auctions/default.jpg', NULL, '1908210019'),
(321, '/uploads/auctions/default.jpg', NULL, '1908210019'),
(322, '/uploads/auctions/default.jpg', NULL, '1908210019'),
(323, '/uploads/auctions/default.jpg', NULL, '1908210020'),
(324, '/uploads/auctions/default.jpg', NULL, '1908210020'),
(325, '/uploads/auctions/default.jpg', NULL, '1908210020'),
(326, '/uploads/auctions/default.jpg', NULL, '1908210020'),
(327, '/uploads/auctions/default.jpg', NULL, '1908210020'),
(328, '/uploads/auctions/default.jpg', NULL, '1908210021'),
(329, '/uploads/auctions/default.jpg', NULL, '1908210021'),
(330, '/uploads/auctions/default.jpg', NULL, '1908210021'),
(331, '/uploads/auctions/default.jpg', NULL, '1908210021'),
(332, '/uploads/auctions/default.jpg', NULL, '1908210021'),
(333, '/uploads/auctions/default.jpg', NULL, '1908210022'),
(334, '/uploads/auctions/default.jpg', NULL, '1908210022'),
(335, '/uploads/auctions/default.jpg', NULL, '1908210022'),
(336, '/uploads/auctions/default.jpg', NULL, '1908210022'),
(337, '/uploads/auctions/default.jpg', NULL, '1908210022'),
(338, '/uploads/auctions/default.jpg', NULL, '1908210023'),
(339, '/uploads/auctions/default.jpg', NULL, '1908210023'),
(340, '/uploads/auctions/default.jpg', NULL, '1908210023'),
(341, '/uploads/auctions/default.jpg', NULL, '1908210023'),
(342, '/uploads/auctions/default.jpg', NULL, '1908210023'),
(343, '/uploads/auctions/default.jpg', NULL, '1908210024'),
(344, '/uploads/auctions/default.jpg', NULL, '1908210024'),
(345, '/uploads/auctions/default.jpg', NULL, '1908210024'),
(346, '/uploads/auctions/default.jpg', NULL, '1908210024'),
(347, '/uploads/auctions/default.jpg', NULL, '1908210024'),
(348, '/uploads/auctions/default.jpg', NULL, '1908210025'),
(349, '/uploads/auctions/default.jpg', NULL, '1908210025'),
(350, '/uploads/auctions/default.jpg', NULL, '1908210025'),
(351, '/uploads/auctions/default.jpg', NULL, '1908210025'),
(352, '/uploads/auctions/default.jpg', NULL, '1908210025'),
(353, '/uploads/auctions/default.jpg', NULL, '1908210026'),
(354, '/uploads/auctions/default.jpg', NULL, '1908210026'),
(355, '/uploads/auctions/default.jpg', NULL, '1908210026'),
(356, '/uploads/auctions/default.jpg', NULL, '1908210026'),
(357, '/uploads/auctions/default.jpg', NULL, '1908210026'),
(358, '/uploads/auctions/default.jpg', NULL, '1908210027'),
(359, '/uploads/auctions/default.jpg', NULL, '1908210027'),
(360, '/uploads/auctions/default.jpg', NULL, '1908210027'),
(361, '/uploads/auctions/default.jpg', NULL, '1908210027'),
(362, '/uploads/auctions/default.jpg', NULL, '1908210027'),
(363, '/uploads/auctions/default.jpg', NULL, '1908210028'),
(364, '/uploads/auctions/default.jpg', NULL, '1908210028'),
(365, '/uploads/auctions/default.jpg', NULL, '1908210028'),
(366, '/uploads/auctions/default.jpg', NULL, '1908210028'),
(367, '/uploads/auctions/default.jpg', NULL, '1908210028'),
(368, '/uploads/auctions/default.jpg', NULL, '1908210029'),
(369, '/uploads/auctions/default.jpg', NULL, '1908210029'),
(370, '/uploads/auctions/default.jpg', NULL, '1908210029'),
(371, '/uploads/auctions/default.jpg', NULL, '1908210029'),
(372, '/uploads/auctions/default.jpg', NULL, '1908210029'),
(373, '/uploads/auctions/default.jpg', NULL, '1908210030'),
(374, '/uploads/auctions/default.jpg', NULL, '1908210030'),
(375, '/uploads/auctions/default.jpg', NULL, '1908210030'),
(376, '/uploads/auctions/default.jpg', NULL, '1908210030'),
(377, '/uploads/auctions/default.jpg', NULL, '1908210030'),
(378, '/uploads/auctions/default.jpg', NULL, '1908210031'),
(379, '/uploads/auctions/default.jpg', NULL, '1908210031'),
(380, '/uploads/auctions/default.jpg', NULL, '1908210031'),
(381, '/uploads/auctions/default.jpg', NULL, '1908210031'),
(382, '/uploads/auctions/default.jpg', NULL, '1908210031'),
(383, '/uploads/auctions/default.jpg', NULL, '1908210032'),
(384, '/uploads/auctions/default.jpg', NULL, '1908210032'),
(385, '/uploads/auctions/default.jpg', NULL, '1908210032'),
(386, '/uploads/auctions/default.jpg', NULL, '1908210032'),
(387, '/uploads/auctions/default.jpg', NULL, '1908210032'),
(388, '/uploads/auctions/default.jpg', NULL, '1908210033'),
(389, '/uploads/auctions/default.jpg', NULL, '1908210033'),
(390, '/uploads/auctions/default.jpg', NULL, '1908210033'),
(391, '/uploads/auctions/default.jpg', NULL, '1908210033'),
(392, '/uploads/auctions/default.jpg', NULL, '1908210033'),
(393, '/uploads/auctions/default.jpg', NULL, '1908210034'),
(394, '/uploads/auctions/default.jpg', NULL, '1908210034'),
(395, '/uploads/auctions/default.jpg', NULL, '1908210034'),
(396, '/uploads/auctions/default.jpg', NULL, '1908210034'),
(397, '/uploads/auctions/default.jpg', NULL, '1908210034'),
(398, '/uploads/auctions/default.jpg', NULL, '1908210035'),
(399, '/uploads/auctions/default.jpg', NULL, '1908210035'),
(400, '/uploads/auctions/default.jpg', NULL, '1908210035'),
(401, '/uploads/auctions/default.jpg', NULL, '1908210035'),
(402, '/uploads/auctions/default.jpg', NULL, '1908210035'),
(403, '/uploads/auctions/default.jpg', NULL, '1908210036'),
(404, '/uploads/auctions/default.jpg', NULL, '1908210036'),
(405, '/uploads/auctions/default.jpg', NULL, '1908210036'),
(406, '/uploads/auctions/default.jpg', NULL, '1908210036'),
(407, '/uploads/auctions/default.jpg', NULL, '1908210036'),
(408, '/uploads/auctions/default.jpg', NULL, '1908210037'),
(409, '/uploads/auctions/default.jpg', NULL, '1908210037'),
(410, '/uploads/auctions/default.jpg', NULL, '1908210037'),
(411, '/uploads/auctions/default.jpg', NULL, '1908210037'),
(412, '/uploads/auctions/default.jpg', NULL, '1908210037'),
(413, '/uploads/auctions/default.jpg', NULL, '1908210038'),
(414, '/uploads/auctions/default.jpg', NULL, '1908210038'),
(415, '/uploads/auctions/default.jpg', NULL, '1908210038'),
(416, '/uploads/auctions/default.jpg', NULL, '1908210038'),
(417, '/uploads/auctions/default.jpg', NULL, '1908210038'),
(418, '/uploads/auctions/default.jpg', NULL, '1908210039'),
(419, '/uploads/auctions/default.jpg', NULL, '1908210039'),
(420, '/uploads/auctions/default.jpg', NULL, '1908210039'),
(421, '/uploads/auctions/default.jpg', NULL, '1908210039'),
(422, '/uploads/auctions/default.jpg', NULL, '1908210039'),
(423, '/uploads/auctions/default.jpg', NULL, '1908210040'),
(424, '/uploads/auctions/default.jpg', NULL, '1908210040'),
(425, '/uploads/auctions/default.jpg', NULL, '1908210040'),
(426, '/uploads/auctions/default.jpg', NULL, '1908210040'),
(427, '/uploads/auctions/default.jpg', NULL, '1908210040'),
(428, '/uploads/auctions/default.jpg', NULL, '1908210041'),
(429, '/uploads/auctions/default.jpg', NULL, '1908210041'),
(430, '/uploads/auctions/default.jpg', NULL, '1908210041'),
(431, '/uploads/auctions/default.jpg', NULL, '1908210041'),
(432, '/uploads/auctions/default.jpg', NULL, '1908210041'),
(433, '/uploads/auctions/default.jpg', NULL, '1908210042'),
(434, '/uploads/auctions/default.jpg', NULL, '1908210042'),
(435, '/uploads/auctions/default.jpg', NULL, '1908210042'),
(436, '/uploads/auctions/default.jpg', NULL, '1908210042'),
(437, '/uploads/auctions/default.jpg', NULL, '1908210042'),
(438, '/uploads/auctions/default.jpg', NULL, '1908210043'),
(439, '/uploads/auctions/default.jpg', NULL, '1908210043'),
(440, '/uploads/auctions/default.jpg', NULL, '1908210043'),
(441, '/uploads/auctions/default.jpg', NULL, '1908210043'),
(442, '/uploads/auctions/default.jpg', NULL, '1908210043'),
(443, '/uploads/auctions/default.jpg', NULL, '1908210044'),
(444, '/uploads/auctions/default.jpg', NULL, '1908210044'),
(445, '/uploads/auctions/default.jpg', NULL, '1908210044'),
(446, '/uploads/auctions/default.jpg', NULL, '1908210044'),
(447, '/uploads/auctions/default.jpg', NULL, '1908210044'),
(448, '/uploads/auctions/default.jpg', NULL, '1908210045'),
(449, '/uploads/auctions/default.jpg', NULL, '1908210045'),
(450, '/uploads/auctions/default.jpg', NULL, '1908210045'),
(451, '/uploads/auctions/default.jpg', NULL, '1908210045'),
(452, '/uploads/auctions/default.jpg', NULL, '1908210045'),
(453, '/uploads/auctions/default.jpg', NULL, '1908210046'),
(454, '/uploads/auctions/default.jpg', NULL, '1908210046'),
(455, '/uploads/auctions/default.jpg', NULL, '1908210046'),
(456, '/uploads/auctions/default.jpg', NULL, '1908210046'),
(457, '/uploads/auctions/default.jpg', NULL, '1908210046'),
(458, '/uploads/auctions/default.jpg', NULL, '1908210047'),
(459, '/uploads/auctions/default.jpg', NULL, '1908210047'),
(460, '/uploads/auctions/default.jpg', NULL, '1908210047'),
(461, '/uploads/auctions/default.jpg', NULL, '1908210047'),
(462, '/uploads/auctions/default.jpg', NULL, '1908210047'),
(463, '/uploads/auctions/default.jpg', NULL, '1908210048'),
(464, '/uploads/auctions/default.jpg', NULL, '1908210048'),
(465, '/uploads/auctions/default.jpg', NULL, '1908210048'),
(466, '/uploads/auctions/default.jpg', NULL, '1908210048'),
(467, '/uploads/auctions/default.jpg', NULL, '1908210048'),
(468, '/uploads/auctions/default.jpg', NULL, '1908210049'),
(469, '/uploads/auctions/default.jpg', NULL, '1908210049'),
(470, '/uploads/auctions/default.jpg', NULL, '1908210049'),
(471, '/uploads/auctions/default.jpg', NULL, '1908210049'),
(472, '/uploads/auctions/default.jpg', NULL, '1908210049'),
(473, '/uploads/auctions/default.jpg', NULL, '1908210050'),
(474, '/uploads/auctions/default.jpg', NULL, '1908210050'),
(475, '/uploads/auctions/default.jpg', NULL, '1908210050'),
(476, '/uploads/auctions/default.jpg', NULL, '1908210050'),
(477, '/uploads/auctions/default.jpg', NULL, '1908210050'),
(478, '/uploads/auctions/default.jpg', NULL, '1908210051'),
(479, '/uploads/auctions/default.jpg', NULL, '1908210051'),
(480, '/uploads/auctions/default.jpg', NULL, '1908210051'),
(481, '/uploads/auctions/default.jpg', NULL, '1908210051'),
(482, '/uploads/auctions/default.jpg', NULL, '1908210051'),
(483, '/uploads/auctions/default.jpg', NULL, '1908210052'),
(484, '/uploads/auctions/default.jpg', NULL, '1908210052'),
(485, '/uploads/auctions/default.jpg', NULL, '1908210052'),
(486, '/uploads/auctions/default.jpg', NULL, '1908210052'),
(487, '/uploads/auctions/default.jpg', NULL, '1908210052'),
(488, '/uploads/auctions/default.jpg', NULL, '1908210053'),
(489, '/uploads/auctions/default.jpg', NULL, '1908210053'),
(490, '/uploads/auctions/default.jpg', NULL, '1908210053'),
(491, '/uploads/auctions/default.jpg', NULL, '1908210053'),
(492, '/uploads/auctions/default.jpg', NULL, '1908210053'),
(493, '/uploads/auctions/default.jpg', NULL, '1908210054'),
(494, '/uploads/auctions/default.jpg', NULL, '1908210054'),
(495, '/uploads/auctions/default.jpg', NULL, '1908210054'),
(496, '/uploads/auctions/default.jpg', NULL, '1908210054'),
(497, '/uploads/auctions/default.jpg', NULL, '1908210054'),
(498, '/uploads/auctions/default.jpg', NULL, '1908210055'),
(499, '/uploads/auctions/default.jpg', NULL, '1908210055'),
(500, '/uploads/auctions/default.jpg', NULL, '1908210055'),
(501, '/uploads/auctions/default.jpg', NULL, '1908210055'),
(502, '/uploads/auctions/default.jpg', NULL, '1908210055'),
(503, '/uploads/auctions/default.jpg', NULL, '1908210056'),
(504, '/uploads/auctions/default.jpg', NULL, '1908210056'),
(505, '/uploads/auctions/default.jpg', NULL, '1908210056'),
(506, '/uploads/auctions/default.jpg', NULL, '1908210056'),
(507, '/uploads/auctions/default.jpg', NULL, '1908210056'),
(508, '/uploads/auctions/default.jpg', NULL, '1908210057'),
(509, '/uploads/auctions/default.jpg', NULL, '1908210057'),
(510, '/uploads/auctions/default.jpg', NULL, '1908210057'),
(511, '/uploads/auctions/default.jpg', NULL, '1908210057'),
(512, '/uploads/auctions/default.jpg', NULL, '1908210057'),
(513, '/uploads/auctions/default.jpg', NULL, '1908210058'),
(514, '/uploads/auctions/default.jpg', NULL, '1908210058'),
(515, '/uploads/auctions/default.jpg', NULL, '1908210058'),
(516, '/uploads/auctions/default.jpg', NULL, '1908210058'),
(517, '/uploads/auctions/default.jpg', NULL, '1908210058'),
(518, '/uploads/auctions/default.jpg', NULL, '1908210059'),
(519, '/uploads/auctions/default.jpg', NULL, '1908210059'),
(520, '/uploads/auctions/default.jpg', NULL, '1908210059'),
(521, '/uploads/auctions/default.jpg', NULL, '1908210059'),
(522, '/uploads/auctions/default.jpg', NULL, '1908210059'),
(523, '/uploads/auctions/default.jpg', NULL, '1908210060'),
(524, '/uploads/auctions/default.jpg', NULL, '1908210060'),
(525, '/uploads/auctions/default.jpg', NULL, '1908210060'),
(526, '/uploads/auctions/default.jpg', NULL, '1908210060'),
(527, '/uploads/auctions/default.jpg', NULL, '1908210060'),
(528, '/uploads/auctions/default.jpg', NULL, '1908210061'),
(529, '/uploads/auctions/default.jpg', NULL, '1908210061'),
(530, '/uploads/auctions/default.jpg', NULL, '1908210061'),
(531, '/uploads/auctions/default.jpg', NULL, '1908210061'),
(532, '/uploads/auctions/default.jpg', NULL, '1908210061'),
(533, '/uploads/auctions/default.jpg', NULL, '1908210062'),
(534, '/uploads/auctions/default.jpg', NULL, '1908210062'),
(535, '/uploads/auctions/default.jpg', NULL, '1908210062'),
(536, '/uploads/auctions/default.jpg', NULL, '1908210062'),
(537, '/uploads/auctions/default.jpg', NULL, '1908210062'),
(538, '/uploads/auctions/default.jpg', NULL, '1908210063'),
(539, '/uploads/auctions/default.jpg', NULL, '1908210063'),
(540, '/uploads/auctions/default.jpg', NULL, '1908210063'),
(541, '/uploads/auctions/default.jpg', NULL, '1908210063'),
(542, '/uploads/auctions/default.jpg', NULL, '1908210063'),
(543, '/uploads/auctions/default.jpg', NULL, '1908210064'),
(544, '/uploads/auctions/default.jpg', NULL, '1908210064'),
(545, '/uploads/auctions/default.jpg', NULL, '1908210064'),
(546, '/uploads/auctions/default.jpg', NULL, '1908210064'),
(547, '/uploads/auctions/default.jpg', NULL, '1908210064'),
(548, '/uploads/auctions/default.jpg', NULL, '1908210065'),
(549, '/uploads/auctions/default.jpg', NULL, '1908210065'),
(550, '/uploads/auctions/default.jpg', NULL, '1908210065'),
(551, '/uploads/auctions/default.jpg', NULL, '1908210065'),
(552, '/uploads/auctions/default.jpg', NULL, '1908210065'),
(553, '/uploads/auctions/default.jpg', NULL, '1908210066'),
(554, '/uploads/auctions/default.jpg', NULL, '1908210066'),
(555, '/uploads/auctions/default.jpg', NULL, '1908210066'),
(556, '/uploads/auctions/default.jpg', NULL, '1908210066'),
(557, '/uploads/auctions/default.jpg', NULL, '1908210066'),
(558, '/uploads/auctions/default.jpg', NULL, '1908210067'),
(559, '/uploads/auctions/default.jpg', NULL, '1908210067'),
(560, '/uploads/auctions/default.jpg', NULL, '1908210067'),
(561, '/uploads/auctions/default.jpg', NULL, '1908210067'),
(562, '/uploads/auctions/default.jpg', NULL, '1908210067'),
(563, '/uploads/auctions/default.jpg', NULL, '1908210068'),
(564, '/uploads/auctions/default.jpg', NULL, '1908210068'),
(565, '/uploads/auctions/default.jpg', NULL, '1908210068'),
(566, '/uploads/auctions/default.jpg', NULL, '1908210068'),
(567, '/uploads/auctions/default.jpg', NULL, '1908210068'),
(568, '/uploads/auctions/default.jpg', NULL, '1908210069'),
(569, '/uploads/auctions/default.jpg', NULL, '1908210069'),
(570, '/uploads/auctions/default.jpg', NULL, '1908210069'),
(571, '/uploads/auctions/default.jpg', NULL, '1908210069'),
(572, '/uploads/auctions/default.jpg', NULL, '1908210069'),
(573, '/uploads/auctions/default.jpg', NULL, '1908210070'),
(574, '/uploads/auctions/default.jpg', NULL, '1908210070'),
(575, '/uploads/auctions/default.jpg', NULL, '1908210070'),
(576, '/uploads/auctions/default.jpg', NULL, '1908210070'),
(577, '/uploads/auctions/default.jpg', NULL, '1908210070'),
(578, '/uploads/auctions/default.jpg', NULL, '1908210071'),
(579, '/uploads/auctions/default.jpg', NULL, '1908210071'),
(580, '/uploads/auctions/default.jpg', NULL, '1908210071'),
(581, '/uploads/auctions/default.jpg', NULL, '1908210071'),
(582, '/uploads/auctions/default.jpg', NULL, '1908210071'),
(583, '/uploads/auctions/default.jpg', NULL, '1908210072'),
(584, '/uploads/auctions/default.jpg', NULL, '1908210072'),
(585, '/uploads/auctions/default.jpg', NULL, '1908210072'),
(586, '/uploads/auctions/default.jpg', NULL, '1908210072'),
(587, '/uploads/auctions/default.jpg', NULL, '1908210072'),
(588, '/uploads/auctions/default.jpg', NULL, '1908210073'),
(589, '/uploads/auctions/default.jpg', NULL, '1908210073'),
(590, '/uploads/auctions/default.jpg', NULL, '1908210073'),
(591, '/uploads/auctions/default.jpg', NULL, '1908210073'),
(592, '/uploads/auctions/default.jpg', NULL, '1908210073'),
(593, '/uploads/auctions/default.jpg', NULL, '1908210074'),
(594, '/uploads/auctions/default.jpg', NULL, '1908210074'),
(595, '/uploads/auctions/default.jpg', NULL, '1908210074'),
(596, '/uploads/auctions/default.jpg', NULL, '1908210074'),
(597, '/uploads/auctions/default.jpg', NULL, '1908210074'),
(598, '/uploads/auctions/default.jpg', NULL, '1908210075'),
(599, '/uploads/auctions/default.jpg', NULL, '1908210075'),
(600, '/uploads/auctions/default.jpg', NULL, '1908210075'),
(601, '/uploads/auctions/default.jpg', NULL, '1908210075'),
(602, '/uploads/auctions/default.jpg', NULL, '1908210075'),
(603, '/uploads/auctions/default.jpg', NULL, '1908210076'),
(604, '/uploads/auctions/default.jpg', NULL, '1908210076'),
(605, '/uploads/auctions/default.jpg', NULL, '1908210076'),
(606, '/uploads/auctions/default.jpg', NULL, '1908210076'),
(607, '/uploads/auctions/default.jpg', NULL, '1908210076'),
(608, '/uploads/auctions/default.jpg', NULL, '1908210077'),
(609, '/uploads/auctions/default.jpg', NULL, '1908210077'),
(610, '/uploads/auctions/default.jpg', NULL, '1908210077'),
(611, '/uploads/auctions/default.jpg', NULL, '1908210077'),
(612, '/uploads/auctions/default.jpg', NULL, '1908210077'),
(613, '/uploads/auctions/default.jpg', NULL, '1908210078'),
(614, '/uploads/auctions/default.jpg', NULL, '1908210078'),
(615, '/uploads/auctions/default.jpg', NULL, '1908210078'),
(616, '/uploads/auctions/default.jpg', NULL, '1908210078'),
(617, '/uploads/auctions/default.jpg', NULL, '1908210078'),
(618, '/uploads/auctions/default.jpg', NULL, '1908210079'),
(619, '/uploads/auctions/default.jpg', NULL, '1908210079'),
(620, '/uploads/auctions/default.jpg', NULL, '1908210079'),
(621, '/uploads/auctions/default.jpg', NULL, '1908210079'),
(622, '/uploads/auctions/default.jpg', NULL, '1908210079'),
(623, '/uploads/auctions/default.jpg', NULL, '1908210080'),
(624, '/uploads/auctions/default.jpg', NULL, '1908210080'),
(625, '/uploads/auctions/default.jpg', NULL, '1908210080'),
(626, '/uploads/auctions/default.jpg', NULL, '1908210080'),
(627, '/uploads/auctions/default.jpg', NULL, '1908210080'),
(628, '/uploads/auctions/default.jpg', NULL, '1908210081'),
(629, '/uploads/auctions/default.jpg', NULL, '1908210081'),
(630, '/uploads/auctions/default.jpg', NULL, '1908210081'),
(631, '/uploads/auctions/default.jpg', NULL, '1908210081'),
(632, '/uploads/auctions/default.jpg', NULL, '1908210081'),
(633, '/uploads/auctions/default.jpg', NULL, '1908210082'),
(634, '/uploads/auctions/default.jpg', NULL, '1908210082'),
(635, '/uploads/auctions/default.jpg', NULL, '1908210082'),
(636, '/uploads/auctions/default.jpg', NULL, '1908210082'),
(637, '/uploads/auctions/default.jpg', NULL, '1908210082'),
(638, '/uploads/auctions/default.jpg', NULL, '1908210083'),
(639, '/uploads/auctions/default.jpg', NULL, '1908210083'),
(640, '/uploads/auctions/default.jpg', NULL, '1908210083'),
(641, '/uploads/auctions/default.jpg', NULL, '1908210083'),
(642, '/uploads/auctions/default.jpg', NULL, '1908210083'),
(643, '/uploads/auctions/default.jpg', NULL, '1908210084'),
(644, '/uploads/auctions/default.jpg', NULL, '1908210084'),
(645, '/uploads/auctions/default.jpg', NULL, '1908210084'),
(646, '/uploads/auctions/default.jpg', NULL, '1908210084'),
(647, '/uploads/auctions/default.jpg', NULL, '1908210084'),
(648, '/uploads/auctions/default.jpg', NULL, '1908210085'),
(649, '/uploads/auctions/default.jpg', NULL, '1908210085'),
(650, '/uploads/auctions/default.jpg', NULL, '1908210085'),
(651, '/uploads/auctions/default.jpg', NULL, '1908210085'),
(652, '/uploads/auctions/default.jpg', NULL, '1908210085'),
(653, '/uploads/auctions/default.jpg', NULL, '1908210086'),
(654, '/uploads/auctions/default.jpg', NULL, '1908210086'),
(655, '/uploads/auctions/default.jpg', NULL, '1908210086'),
(656, '/uploads/auctions/default.jpg', NULL, '1908210086'),
(657, '/uploads/auctions/default.jpg', NULL, '1908210086'),
(658, '/uploads/auctions/default.jpg', NULL, '1908210087'),
(659, '/uploads/auctions/default.jpg', NULL, '1908210087'),
(660, '/uploads/auctions/default.jpg', NULL, '1908210087'),
(661, '/uploads/auctions/default.jpg', NULL, '1908210087'),
(662, '/uploads/auctions/default.jpg', NULL, '1908210087'),
(663, '/uploads/auctions/default.jpg', NULL, '1908210088'),
(664, '/uploads/auctions/default.jpg', NULL, '1908210088'),
(665, '/uploads/auctions/default.jpg', NULL, '1908210088'),
(666, '/uploads/auctions/default.jpg', NULL, '1908210088'),
(667, '/uploads/auctions/default.jpg', NULL, '1908210088'),
(668, '/uploads/auctions/default.jpg', NULL, '1908210089'),
(669, '/uploads/auctions/default.jpg', NULL, '1908210089'),
(670, '/uploads/auctions/default.jpg', NULL, '1908210089'),
(671, '/uploads/auctions/default.jpg', NULL, '1908210089'),
(672, '/uploads/auctions/default.jpg', NULL, '1908210089'),
(673, '/uploads/auctions/default.jpg', NULL, '1908210090'),
(674, '/uploads/auctions/default.jpg', NULL, '1908210090'),
(675, '/uploads/auctions/default.jpg', NULL, '1908210090'),
(676, '/uploads/auctions/default.jpg', NULL, '1908210090'),
(677, '/uploads/auctions/default.jpg', NULL, '1908210090'),
(678, '/uploads/auctions/default.jpg', NULL, '1908210091'),
(679, '/uploads/auctions/default.jpg', NULL, '1908210091'),
(680, '/uploads/auctions/default.jpg', NULL, '1908210091'),
(681, '/uploads/auctions/default.jpg', NULL, '1908210091'),
(682, '/uploads/auctions/default.jpg', NULL, '1908210091'),
(683, '/uploads/auctions/default.jpg', NULL, '1908210092'),
(684, '/uploads/auctions/default.jpg', NULL, '1908210092'),
(685, '/uploads/auctions/default.jpg', NULL, '1908210092'),
(686, '/uploads/auctions/default.jpg', NULL, '1908210092'),
(687, '/uploads/auctions/default.jpg', NULL, '1908210092'),
(688, '/uploads/auctions/default.jpg', NULL, '1908210093'),
(689, '/uploads/auctions/default.jpg', NULL, '1908210093'),
(690, '/uploads/auctions/default.jpg', NULL, '1908210093'),
(691, '/uploads/auctions/default.jpg', NULL, '1908210093'),
(692, '/uploads/auctions/default.jpg', NULL, '1908210093'),
(693, '/uploads/auctions/default.jpg', NULL, '1908210094'),
(694, '/uploads/auctions/default.jpg', NULL, '1908210094'),
(695, '/uploads/auctions/default.jpg', NULL, '1908210094'),
(696, '/uploads/auctions/default.jpg', NULL, '1908210094'),
(697, '/uploads/auctions/default.jpg', NULL, '1908210094'),
(698, '/uploads/auctions/default.jpg', NULL, '1908210095'),
(699, '/uploads/auctions/default.jpg', NULL, '1908210095'),
(700, '/uploads/auctions/default.jpg', NULL, '1908210095'),
(701, '/uploads/auctions/default.jpg', NULL, '1908210095'),
(702, '/uploads/auctions/default.jpg', NULL, '1908210095'),
(703, '/uploads/auctions/default.jpg', NULL, '1908210096'),
(704, '/uploads/auctions/default.jpg', NULL, '1908210096'),
(705, '/uploads/auctions/default.jpg', NULL, '1908210096'),
(706, '/uploads/auctions/default.jpg', NULL, '1908210096'),
(707, '/uploads/auctions/default.jpg', NULL, '1908210096'),
(708, '/uploads/auctions/default.jpg', NULL, '1908210097'),
(709, '/uploads/auctions/default.jpg', NULL, '1908210097'),
(710, '/uploads/auctions/default.jpg', NULL, '1908210097'),
(711, '/uploads/auctions/default.jpg', NULL, '1908210097'),
(712, '/uploads/auctions/default.jpg', NULL, '1908210097'),
(713, '/uploads/auctions/default.jpg', NULL, '1908210098'),
(714, '/uploads/auctions/default.jpg', NULL, '1908210098'),
(715, '/uploads/auctions/default.jpg', NULL, '1908210098'),
(716, '/uploads/auctions/default.jpg', NULL, '1908210098'),
(717, '/uploads/auctions/default.jpg', NULL, '1908210098'),
(718, '/uploads/auctions/default.jpg', NULL, '1908210099'),
(719, '/uploads/auctions/default.jpg', NULL, '1908210099'),
(720, '/uploads/auctions/default.jpg', NULL, '1908210099'),
(721, '/uploads/auctions/default.jpg', NULL, '1908210099'),
(722, '/uploads/auctions/default.jpg', NULL, '1908210099'),
(723, '/uploads/auctions/default.jpg', NULL, '19082100100'),
(724, '/uploads/auctions/default.jpg', NULL, '19082100100'),
(725, '/uploads/auctions/default.jpg', NULL, '19082100100'),
(726, '/uploads/auctions/default.jpg', NULL, '19082100100'),
(727, '/uploads/auctions/default.jpg', NULL, '19082100100'),
(728, '/uploads/auctions/default.jpg', NULL, '19082100101'),
(729, '/uploads/auctions/default.jpg', NULL, '19082100101'),
(730, '/uploads/auctions/default.jpg', NULL, '19082100101'),
(731, '/uploads/auctions/default.jpg', NULL, '19082100101'),
(732, '/uploads/auctions/default.jpg', NULL, '19082100101'),
(733, '/uploads/auctions/default.jpg', NULL, '19082100102'),
(734, '/uploads/auctions/default.jpg', NULL, '19082100102'),
(735, '/uploads/auctions/default.jpg', NULL, '19082100102'),
(736, '/uploads/auctions/default.jpg', NULL, '19082100102'),
(737, '/uploads/auctions/default.jpg', NULL, '19082100102'),
(738, '/uploads/auctions/default.jpg', NULL, '19082100103'),
(739, '/uploads/auctions/default.jpg', NULL, '19082100103'),
(740, '/uploads/auctions/default.jpg', NULL, '19082100103'),
(741, '/uploads/auctions/default.jpg', NULL, '19082100103'),
(742, '/uploads/auctions/default.jpg', NULL, '19082100103'),
(743, '/uploads/auctions/default.jpg', NULL, '19082100104'),
(744, '/uploads/auctions/default.jpg', NULL, '19082100104'),
(745, '/uploads/auctions/default.jpg', NULL, '19082100104'),
(746, '/uploads/auctions/default.jpg', NULL, '19082100104'),
(747, '/uploads/auctions/default.jpg', NULL, '19082100104'),
(748, '/uploads/auctions/default.jpg', NULL, '19082100105'),
(749, '/uploads/auctions/default.jpg', NULL, '19082100105'),
(750, '/uploads/auctions/default.jpg', NULL, '19082100105'),
(751, '/uploads/auctions/default.jpg', NULL, '19082100105'),
(752, '/uploads/auctions/default.jpg', NULL, '19082100105'),
(753, '/uploads/auctions/default.jpg', NULL, '19082100106'),
(754, '/uploads/auctions/default.jpg', NULL, '19082100106'),
(755, '/uploads/auctions/default.jpg', NULL, '19082100106'),
(756, '/uploads/auctions/default.jpg', NULL, '19082100106'),
(757, '/uploads/auctions/default.jpg', NULL, '19082100106'),
(758, '/uploads/auctions/default.jpg', NULL, '19082100107'),
(759, '/uploads/auctions/default.jpg', NULL, '19082100107'),
(760, '/uploads/auctions/default.jpg', NULL, '19082100107'),
(761, '/uploads/auctions/default.jpg', NULL, '19082100107'),
(762, '/uploads/auctions/default.jpg', NULL, '19082100107'),
(763, '/uploads/auctions/default.jpg', NULL, '19082100108'),
(764, '/uploads/auctions/default.jpg', NULL, '19082100108'),
(765, '/uploads/auctions/default.jpg', NULL, '19082100108'),
(766, '/uploads/auctions/default.jpg', NULL, '19082100108'),
(767, '/uploads/auctions/default.jpg', NULL, '19082100108'),
(768, '/uploads/auctions/default.jpg', NULL, '19082100109'),
(769, '/uploads/auctions/default.jpg', NULL, '19082100109'),
(770, '/uploads/auctions/default.jpg', NULL, '19082100109'),
(771, '/uploads/auctions/default.jpg', NULL, '19082100109'),
(772, '/uploads/auctions/default.jpg', NULL, '19082100109'),
(773, '/uploads/auctions/default.jpg', NULL, '19082100110'),
(774, '/uploads/auctions/default.jpg', NULL, '19082100110'),
(775, '/uploads/auctions/default.jpg', NULL, '19082100110'),
(776, '/uploads/auctions/default.jpg', NULL, '19082100110'),
(777, '/uploads/auctions/default.jpg', NULL, '19082100110'),
(778, '/uploads/auctions/default.jpg', NULL, '19082100111'),
(779, '/uploads/auctions/default.jpg', NULL, '19082100111'),
(780, '/uploads/auctions/default.jpg', NULL, '19082100111'),
(781, '/uploads/auctions/default.jpg', NULL, '19082100111'),
(782, '/uploads/auctions/default.jpg', NULL, '19082100111'),
(783, '/uploads/auctions/default.jpg', NULL, '19082100112'),
(784, '/uploads/auctions/default.jpg', NULL, '19082100112'),
(785, '/uploads/auctions/default.jpg', NULL, '19082100112'),
(786, '/uploads/auctions/default.jpg', NULL, '19082100112'),
(787, '/uploads/auctions/default.jpg', NULL, '19082100112'),
(788, '/uploads/auctions/default.jpg', NULL, '19082100113'),
(789, '/uploads/auctions/default.jpg', NULL, '19082100113'),
(790, '/uploads/auctions/default.jpg', NULL, '19082100113'),
(791, '/uploads/auctions/default.jpg', NULL, '19082100113'),
(792, '/uploads/auctions/default.jpg', NULL, '19082100113'),
(793, '/uploads/auctions/default.jpg', NULL, '19082100114'),
(794, '/uploads/auctions/default.jpg', NULL, '19082100114'),
(795, '/uploads/auctions/default.jpg', NULL, '19082100114'),
(796, '/uploads/auctions/default.jpg', NULL, '19082100114'),
(797, '/uploads/auctions/default.jpg', NULL, '19082100114'),
(798, '/uploads/auctions/default.jpg', NULL, '19082100115'),
(799, '/uploads/auctions/default.jpg', NULL, '19082100115'),
(800, '/uploads/auctions/default.jpg', NULL, '19082100115'),
(801, '/uploads/auctions/default.jpg', NULL, '19082100115'),
(802, '/uploads/auctions/default.jpg', NULL, '19082100115'),
(803, '/uploads/auctions/default.jpg', NULL, '19082100116'),
(804, '/uploads/auctions/default.jpg', NULL, '19082100116'),
(805, '/uploads/auctions/default.jpg', NULL, '19082100116'),
(806, '/uploads/auctions/default.jpg', NULL, '19082100116'),
(807, '/uploads/auctions/default.jpg', NULL, '19082100116'),
(808, '/uploads/auctions/default.jpg', NULL, '19082100117'),
(809, '/uploads/auctions/default.jpg', NULL, '19082100117'),
(810, '/uploads/auctions/default.jpg', NULL, '19082100117'),
(811, '/uploads/auctions/default.jpg', NULL, '19082100117'),
(812, '/uploads/auctions/default.jpg', NULL, '19082100117'),
(813, '/uploads/auctions/default.jpg', NULL, '19082100118'),
(814, '/uploads/auctions/default.jpg', NULL, '19082100118'),
(815, '/uploads/auctions/default.jpg', NULL, '19082100118'),
(816, '/uploads/auctions/default.jpg', NULL, '19082100118'),
(817, '/uploads/auctions/default.jpg', NULL, '19082100118'),
(818, '/uploads/auctions/default.jpg', NULL, '19082100119'),
(819, '/uploads/auctions/default.jpg', NULL, '19082100119'),
(820, '/uploads/auctions/default.jpg', NULL, '19082100119'),
(821, '/uploads/auctions/default.jpg', NULL, '19082100119'),
(822, '/uploads/auctions/default.jpg', NULL, '19082100119'),
(823, '/uploads/auctions/default.jpg', NULL, '19082100120'),
(824, '/uploads/auctions/default.jpg', NULL, '19082100120'),
(825, '/uploads/auctions/default.jpg', NULL, '19082100120'),
(826, '/uploads/auctions/default.jpg', NULL, '19082100120'),
(827, '/uploads/auctions/default.jpg', NULL, '19082100120'),
(828, '/uploads/auctions/default.jpg', NULL, '19082100121'),
(829, '/uploads/auctions/default.jpg', NULL, '19082100121'),
(830, '/uploads/auctions/default.jpg', NULL, '19082100121'),
(831, '/uploads/auctions/default.jpg', NULL, '19082100121'),
(832, '/uploads/auctions/default.jpg', NULL, '19082100121'),
(833, '/uploads/auctions/default.jpg', NULL, '19082100122'),
(834, '/uploads/auctions/default.jpg', NULL, '19082100122'),
(835, '/uploads/auctions/default.jpg', NULL, '19082100122'),
(836, '/uploads/auctions/default.jpg', NULL, '19082100122'),
(837, '/uploads/auctions/default.jpg', NULL, '19082100122'),
(838, '/uploads/auctions/default.jpg', NULL, '19082100123'),
(839, '/uploads/auctions/default.jpg', NULL, '19082100123'),
(840, '/uploads/auctions/default.jpg', NULL, '19082100123'),
(841, '/uploads/auctions/default.jpg', NULL, '19082100123'),
(842, '/uploads/auctions/default.jpg', NULL, '19082100123');

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
(5, 'sepatu', 'Sepatu'),
(6, 'pakaian-wanita', 'Pakaian Wanita'),
(7, 'perlengkapan-rumah', 'Perlengkapan Rumah'),
(8, 'elektronik', 'Elektronik'),
(9, 'action-figure', 'Action Figure'),
(10, 'komputer-dan-aksesoris', 'Komputer & Aksesoris'),
(11, 'lukisan', 'Lukisan');

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

--
-- Dumping data untuk tabel `tbl_lelang`
--

INSERT INTO `tbl_lelang` (`_id`, `id_lelang`, `judul`, `status_brg`, `hrg_awal`, `kelipatan_hrg`, `batas_tawaran`, `deskripsi`, `tgl_mulai`, `tgl_selesai`, `status_lelang`, `alamat_barang`, `jenis_pengiriman`, `dimensi_brg`, `biaya_packing`, `tgl_dibuat`, `tgl_diubah`, `ModelMemberIdMember`, `id_member`, `id_kategori`, `ModelKategoriIdKategori`) VALUES
(1, '1808210001', 'Kursi', 'Seperti baru', '100.000', '30.000', 7, '', '2021-08-18 20:05:02', '2021-08-20 16:56:46', 3, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"30\",\"lebar\":\"200\",\"tinggi\":\"25\",\"berat\":\"1000\"}', '5000', '2021-08-18 20:04:55', '2021-08-20 16:57:11', NULL, 'MBR001', 7, NULL),
(2, '1808210002', 'Dumb auctio', '100% baru', '80.000', '10.000', 5, '', '2021-08-18 23:35:23', '2021-08-24 23:34:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"160\",\"lebar\":\"200\",\"tinggi\":\"25\",\"berat\":\"6000\"}', '20000', '2021-08-18 23:35:18', '2021-08-18 23:35:23', NULL, 'MBR001', 5, NULL),
(3, '1908210003', 'Lelang 5', 'Rusak', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 8, NULL),
(4, '1908210004', 'Lelang 6', 'Bekas dengan kondisi cacat', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 9, NULL),
(5, '1908210005', 'Lelang 7', 'Rusak', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 9, NULL),
(6, '1908210006', 'Lelang 8', 'Bekas dengan kondisi baik', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 5, NULL),
(7, '1908210007', 'Lelang 9', '100%', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(8, '1908210008', 'Lelang 10', 'Bekas dengan kondisi baik', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(10, '1908210010', 'Lelang 12', '100%', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 9, NULL),
(100, '19082100100', 'Lelang 174', 'Bekas dengan kondisi cacat', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 5, NULL),
(101, '19082100101', 'Lelang 175', 'Bekas dengan kondisi cacat', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 7, NULL),
(102, '19082100102', 'Lelang 176', 'Bekas dengan kondisi cacat', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 5, NULL),
(103, '19082100103', 'Lelang 177', '100% Baru', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 5, NULL),
(104, '19082100104', 'Lelang 178', 'Bekas dengan kondisi baik', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 9, NULL),
(105, '19082100105', 'Lelang 179', 'Seperti baru', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL),
(106, '19082100106', 'Lelang 180', 'Bekas dengan kondisi cacat', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 7, NULL),
(107, '19082100107', 'Lelang 181', 'Bekas dengan kondisi cacat', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 7, NULL),
(108, '19082100108', 'Lelang 182', 'Rusak', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 6, NULL),
(109, '19082100109', 'Lelang 183', 'Bekas dengan kondisi baik', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 7, NULL),
(11, '1908210011', 'Lelang 13', 'Rusak', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 7, NULL),
(110, '19082100110', 'Lelang 184', 'Bekas dengan kondisi baik', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(111, '19082100111', 'Lelang 185', 'Bekas dengan kondisi baik', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 7, NULL),
(112, '19082100112', 'Lelang 186', 'Bekas dengan kondisi cacat', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(113, '19082100113', 'Lelang 187', '100% Baru', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL),
(114, '19082100114', 'Lelang 188', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 8, NULL),
(115, '19082100115', 'Lelang 189', 'Seperti baru', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL),
(116, '19082100116', 'Lelang 190', 'Bekas dengan kondisi cacat', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 7, NULL),
(117, '19082100117', 'Lelang 191', '100% Baru', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(118, '19082100118', 'Lelang 192', 'Bekas dengan kondisi baik', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 7, NULL),
(119, '19082100119', 'Lelang 193', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(12, '1908210012', 'Lelang 14', 'Rusak', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 5, NULL),
(120, '19082100120', 'Lelang 194', '100% Baru', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(121, '19082100121', 'Lelang 195', 'Seperti baru', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(122, '19082100122', 'Lelang 196', 'Seperti baru', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(123, '19082100123', 'Lelang 197', '100% Baru', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 6, NULL),
(13, '1908210013', 'Lelang 15', 'Seperti baru', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 9, NULL),
(14, '1908210014', 'Lelang 16', 'Rusak', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 6, NULL),
(15, '1908210015', 'Lelang 17', 'Bekas dengan kondisi baik', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 6, NULL),
(16, '1908210016', 'Lelang 18', 'Seperti baru', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 7, NULL),
(17, '1908210017', 'Lelang 19', 'Rusak', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 6, NULL),
(18, '1908210018', 'Lelang 20', 'Rusak', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 9, NULL),
(19, '1908210019', 'Lelang 21', '100%', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 8, NULL),
(20, '1908210020', 'Lelang 22', 'Seperti baru', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 7, NULL),
(21, '1908210021', 'Lelang 23', 'Seperti baru', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(22, '1908210022', 'Lelang 24', 'Rusak', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 9, NULL),
(23, '1908210023', 'Lelang 25', '100%', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 8, NULL),
(24, '1908210024', 'Lelang 26', 'Seperti baru', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 6, NULL),
(25, '1908210025', 'Lelang 27', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 6, NULL),
(26, '1908210026', 'Lelang 28', '100%', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 5, NULL),
(27, '1908210027', 'Lelang 29', 'Seperti baru', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(28, '1908210028', 'Lelang 30', 'Bekas dengan kondisi cacat', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 7, NULL);
INSERT INTO `tbl_lelang` (`_id`, `id_lelang`, `judul`, `status_brg`, `hrg_awal`, `kelipatan_hrg`, `batas_tawaran`, `deskripsi`, `tgl_mulai`, `tgl_selesai`, `status_lelang`, `alamat_barang`, `jenis_pengiriman`, `dimensi_brg`, `biaya_packing`, `tgl_dibuat`, `tgl_diubah`, `ModelMemberIdMember`, `id_member`, `id_kategori`, `ModelKategoriIdKategori`) VALUES
(29, '1908210029', 'Lelang 31', 'Rusak', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 7, NULL),
(30, '1908210030', 'Lelang 32', 'Seperti baru', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 9, NULL),
(31, '1908210031', 'Lelang 33', 'Bekas dengan kondisi cacat', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(32, '1908210032', 'Lelang 34', 'Seperti baru', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 8, NULL),
(33, '1908210033', 'Lelang 35', 'Rusak', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 9, NULL),
(34, '1908210034', 'Lelang 36', 'Rusak', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(35, '1908210035', 'Lelang 37', 'Seperti baru', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(36, '1908210036', 'Lelang 38', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 6, NULL),
(37, '1908210037', 'Lelang 39', '100%', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 9, NULL),
(38, '1908210038', 'Lelang 40', 'Seperti baru', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 9, NULL),
(39, '1908210039', 'Lelang 41', '100%', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 7, NULL),
(40, '1908210040', 'Lelang 42', 'Bekas dengan kondisi cacat', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 8, NULL),
(41, '1908210041', 'Lelang 43', 'Rusak', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 8, NULL),
(42, '1908210042', 'Lelang 44', 'Bekas dengan kondisi baik', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 8, NULL),
(43, '1908210043', 'Lelang 45', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(44, '1908210044', 'Lelang 46', '100%', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 9, NULL),
(45, '1908210045', 'Lelang 47', 'Rusak', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 5, NULL),
(46, '1908210046', 'Lelang 48', 'Bekas dengan kondisi cacat', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 8, NULL),
(47, '1908210047', 'Lelang 49', '100%', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR002', 9, NULL),
(48, '1908210048', 'Lelang 50', 'Bekas dengan kondisi cacat', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 6, NULL),
(49, '1908210049', 'Lelang 51', '100%', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 8, NULL),
(50, '1908210050', 'Lelang 52', 'Bekas dengan kondisi cacat', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR003', 5, NULL),
(51, '1908210051', 'Lelang 101', 'Rusak', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 5, NULL),
(52, '1908210052', 'Lelang 102', '100% Baru', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR002', 8, NULL),
(53, '1908210053', 'Lelang 103', '100% Baru', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 8, NULL),
(54, '1908210054', 'Lelang 104', 'Rusak', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 7, NULL),
(55, '1908210055', 'Lelang 105', 'Bekas dengan kondisi baik', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 9, NULL),
(56, '1908210056', 'Lelang 106', 'Seperti baru', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 6, NULL),
(57, '1908210057', 'Lelang 107', 'Seperti baru', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 5, NULL),
(58, '1908210058', 'Lelang 108', 'Rusak', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 9, NULL),
(59, '1908210059', 'Lelang 109', 'Bekas dengan kondisi cacat', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 7, NULL),
(60, '1908210060', 'Lelang 110', 'Seperti baru', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR002', 5, NULL),
(61, '1908210061', 'Lelang 111', 'Bekas dengan kondisi baik', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 9, NULL),
(62, '1908210062', 'Lelang 112', 'Rusak', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 5, NULL),
(63, '1908210063', 'Lelang 113', 'Seperti baru', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 9, NULL),
(64, '1908210064', 'Lelang 114', 'Rusak', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 8, NULL),
(65, '1908210065', 'Lelang 115', 'Bekas dengan kondisi cacat', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR002', 5, NULL),
(66, '1908210066', 'Lelang 116', 'Seperti baru', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 6, NULL),
(67, '1908210067', 'Lelang 117', 'Bekas dengan kondisi baik', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 9, NULL),
(68, '1908210068', 'Lelang 118', 'Rusak', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR002', 7, NULL),
(69, '1908210069', 'Lelang 119', 'Bekas dengan kondisi baik', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 7, NULL),
(70, '1908210070', 'Lelang 120', 'Rusak', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 8, NULL),
(71, '1908210071', 'Lelang 121', 'Bekas dengan kondisi cacat', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR001', 8, NULL),
(72, '1908210072', 'Lelang 122', 'Bekas dengan kondisi cacat', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 7, NULL),
(73, '1908210073', 'Lelang 123', '100% Baru', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR002', 8, NULL),
(74, '1908210074', 'Lelang 124', 'Bekas dengan kondisi cacat', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:28:00', '2021-08-26 13:28:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:28:36', '2021-08-19 13:28:36', NULL, 'MBR003', 8, NULL),
(75, '1908210075', 'Lelang 149', '100% Baru', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 7, NULL),
(76, '1908210076', 'Lelang 150', 'Bekas dengan kondisi baik', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(77, '1908210077', 'Lelang 151', 'Rusak', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL),
(78, '1908210078', 'Lelang 152', 'Rusak', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL);
INSERT INTO `tbl_lelang` (`_id`, `id_lelang`, `judul`, `status_brg`, `hrg_awal`, `kelipatan_hrg`, `batas_tawaran`, `deskripsi`, `tgl_mulai`, `tgl_selesai`, `status_lelang`, `alamat_barang`, `jenis_pengiriman`, `dimensi_brg`, `biaya_packing`, `tgl_dibuat`, `tgl_diubah`, `ModelMemberIdMember`, `id_member`, `id_kategori`, `ModelKategoriIdKategori`) VALUES
(79, '1908210079', 'Lelang 153', '100% Baru', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 8, NULL),
(80, '1908210080', 'Lelang 154', 'Rusak', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 7, NULL),
(81, '1908210081', 'Lelang 155', 'Bekas dengan kondisi cacat', '200.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 8, NULL),
(82, '1908210082', 'Lelang 156', 'Seperti baru', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 8, NULL),
(83, '1908210083', 'Lelang 157', 'Seperti baru', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 9, NULL),
(84, '1908210084', 'Lelang 158', 'Rusak', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 8, NULL),
(85, '1908210085', 'Lelang 159', 'Bekas dengan kondisi baik', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(86, '1908210086', 'Lelang 160', 'Seperti baru', '100.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 5, NULL),
(87, '1908210087', 'Lelang 161', 'Bekas dengan kondisi baik', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 7, NULL),
(88, '1908210088', 'Lelang 162', 'Bekas dengan kondisi cacat', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 8, NULL),
(89, '1908210089', 'Lelang 163', '100% Baru', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 7, NULL),
(9, '190821009', 'Lelang 11', 'Seperti baru', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:21:00', '2021-08-26 13:21:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:21:33', '2021-08-19 13:21:33', NULL, 'MBR001', 9, NULL),
(90, '1908210090', 'Lelang 164', 'Bekas dengan kondisi baik', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 8, NULL),
(91, '1908210091', 'Lelang 165', 'Bekas dengan kondisi cacat', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(92, '1908210092', 'Lelang 166', 'Rusak', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 9, NULL),
(93, '1908210093', 'Lelang 167', 'Bekas dengan kondisi baik', '725.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 7, NULL),
(94, '1908210094', 'Lelang 168', 'Seperti baru', '500.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 9, NULL),
(95, '1908210095', 'Lelang 169', 'Bekas dengan kondisi baik', '170.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 5, NULL),
(96, '1908210096', 'Lelang 170', '100% Baru', '250.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR003', 5, NULL),
(97, '1908210097', 'Lelang 171', 'Bekas dengan kondisi cacat', '300.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR002', 7, NULL),
(98, '1908210098', 'Lelang 172', 'Seperti baru', '90.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 6, NULL),
(99, '1908210099', 'Lelang 173', '100% Baru', '1.000.000', '10.000', 9, 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam blanditiis quasi optio temporibus cupiditate voluptas, esse nisi ex deleniti sequi exercitationem autem suscipit debitis est pariatur amet rerum fugiat! Officiis omnis explicabo ratione natus eveniet neque quia alias aspernatur nostrum reiciendis, dicta, ducimus dolor at quas earum cumque. Porro, dicta.', '2021-08-19 13:30:00', '2021-08-26 13:30:00', 1, '{\"id_provinsi\":\"31\",\"id_kota\":\"3172\",\"id_kecamatan\":\"3172060\",\"id_kelurahan\":\"3172060003\",\"alamat\":\"Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta\",\"kode_pos\":\"13410\"}', '{\"pickup\":true,\"courier_service\":true}', '{\"panjang\":\"200\",\"lebar\":\"200\",\"tinggi\":\"200\",\"berat\":\"6000\"}', '20000', '2021-08-19 13:30:26', '2021-08-19 13:30:26', NULL, 'MBR001', 6, NULL);

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

--
-- Dumping data untuk tabel `tbl_member`
--

INSERT INTO `tbl_member` (`id_member`, `nama`, `username`, `email`, `password`, `alamat`, `kode_pos`, `no_hp`, `no_ktp`, `id_provinsi`, `id_kota`, `id_kecamatan`, `id_kelurahan`, `tgl_lahir`, `foto`, `tgl_dibuat`, `tgl_diubah`) VALUES
('MBR001', 'member01', 'member01', 'member01@gmail.com', '$2a$12$bZfJK37DB5cZg.s0iNuipufbkaKNkXxClMoNQJrucws02Jc4X.0AO', 'Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta', '13410', '081310757525', '0802020202101022', '31', '3172', '3172060', '3172060003', '1996-05-28', 'uploads/members/guest.png', '2021-08-18 19:44:37', '2021-08-18 20:03:23'),
('MBR002', 'Jieun', 'Jieun93', 'jieun@gmail.com', '$2a$12$WJeOVVfcJew.3QMXkifBiuidnA1.vU2ly7wk2t8M0HU.q6FC2r5jq', NULL, NULL, '081244967969', NULL, NULL, NULL, NULL, NULL, NULL, 'uploads/members/guest.png', '2021-08-18 20:12:27', '2021-08-18 20:12:27'),
('MBR003', 'Member02', 'member02', 'member02@gmail.com', '$2a$12$PYd8ciT56woXimCe6kSSKeIHX9GQAJIzh5CKBIoLfyVYNvtgwho6.', 'Jl. Antariksa III No.7, RT.1/RW.8, Cipinang Besar Sel., Kecamatan Jatinegara, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta', '13410', '081375757575', '0802020202101022', '31', '3172', '3172060', '3172060003', '1996-05-28', 'uploads/members/Baebid-MBR003_2021-08-20-135526.jpg', '2021-08-19 07:27:09', '2021-08-20 13:58:40'),
('MBR004', 'unit01', 'unit01', 'unit01@gmail.com', '$2a$12$ncRJAljoBbiMmSnGPYhKxOxp/TxJNT8X0tuA3z0eZAkb58jI1i81i', 'Jl. Katalia 2 Blok K2 No.10, RT.5/RW.12, Kebalen, Kec. Babelan, Bekasi, Jawa Barat 17610', '17610', '081244967969', '0802020202101022', '32', '3201', '3201010', '3216050004', '1996-05-28', 'uploads/members/guest.png', '2021-08-20 16:54:14', '2021-08-20 16:58:30');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tbl_pengiriman`
--

CREATE TABLE `tbl_pengiriman` (
  `id_pengiriman` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tgl_dikirim` datetime DEFAULT NULL,
  `tgl_diterima` datetime DEFAULT NULL,
  `no_resi` varchar(255) DEFAULT NULL,
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
  `isi_pesan` varchar(24) DEFAULT NULL,
  `id_parent` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
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
('BID0001', 0, '755.000', '2021-08-19 16:53:12', NULL, '1908210006', NULL, 'MBR003'),
('BID0002', 1, '160.000', '2021-08-20 16:55:00', NULL, '1808210001', NULL, 'MBR004');

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
  `bukti_transfer` varchar(255) DEFAULT NULL,
  `batas_waktu_bayar` datetime DEFAULT NULL,
  `jenis_pengiriman` varchar(30) DEFAULT NULL,
  `ongkir` varchar(20) DEFAULT NULL,
  `status_transaksi` varchar(255) DEFAULT NULL,
  `tgl_dibuat` datetime NOT NULL,
  `tgl_diubah` datetime NOT NULL,
  `ModelPenawaranIdTawaran` varchar(7) DEFAULT NULL,
  `id_tawaran` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `tbl_transaksi`
--

INSERT INTO `tbl_transaksi` (`_id`, `id_transaksi`, `nama_penerima`, `nohp_penerima`, `alamat_tujuan`, `total_harga`, `status_bayar`, `tgl_bayar`, `bukti_transfer`, `batas_waktu_bayar`, `jenis_pengiriman`, `ongkir`, `status_transaksi`, `tgl_dibuat`, `tgl_diubah`, `ModelPenawaranIdTawaran`, `id_tawaran`) VALUES
(1, '2008210001', 'Unit 02', '08944728271', '{\"provinsi\":\"Jawa Barat\",\"kota\":\"Kabupaten Bogor\",\"kecamatan\":\"Nanggung\",\"kelurahan\":\"Waringinjaya\",\"alamat\":\"Jl. Katalia 2 Blok K2 No.10, RT.5/RW.12, Kebalen, Kec. Babelan, Bekasi, Jawa Barat 17610\",\"kode_pos\":\"17610\"}', '165000', 0, NULL, NULL, '2021-08-21 16:58:54', 'PICKUP', NULL, '2', '2021-08-20 16:57:11', '2021-08-20 16:58:54', NULL, 'BID0002');

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
  ADD UNIQUE KEY `_id` (`_id`),
  ADD UNIQUE KEY `id_transaksi` (`id_transaksi`),
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
  MODIFY `id_galeri` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=843;

--
-- AUTO_INCREMENT untuk tabel `tbl_kategori`
--
ALTER TABLE `tbl_kategori`
  MODIFY `id_kategori` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
