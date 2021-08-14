import Sequelize from "sequelize";

const DataTypes = Sequelize.DataTypes;

const foreignKeysData = {
  idMember: {
    name: "id_member",
    type: DataTypes.STRING(11),
  },
  idKategori: {
    name: "id_kategori",
    type: DataTypes.INTEGER,
  },
  idLelang: {
    name: "id_lelang",
    type: DataTypes.STRING(11),
  },
  idTawaran: {
    name: "id_tawaran",
    type: DataTypes.STRING(7),
  },
  idTransaksi: {
    name: "id_transaksi",
    type: DataTypes.STRING(11),
  },
  idRuangDiskusi: {
    name: "id_ruang",
    type: DataTypes.UUID,
  },
};

export default foreignKeysData;
