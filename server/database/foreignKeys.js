import Sequelize from "sequelize";

const DataTypes = Sequelize.DataTypes;

const foreignKeysData = {
  idMember: {
    name: "id_member",
    type: DataTypes.STRING(20),
  },
  idKategori: {
    name: "id_kategori",
    type: DataTypes.INTEGER,
  },
  idLelang: {
    name: "id_lelang",
    type: DataTypes.INTEGER,
  },
  idTawaran: {
    name: "id_tawaran",
    type: DataTypes.STRING(12),
  },
  idTransaksi: {
    name: "id_transaksi",
    type: DataTypes.INTEGER,
  },
  idRuangDiskusi: {
    name: "id_ruang",
    type: DataTypes.UUID,
  },
};

export default foreignKeysData;
