import Sequelize from "sequelize";

const DataTypes = Sequelize.DataTypes;

const foreignKeysData = {
  idMember: {
    name: "id_member",
    type: DataTypes.UUID,
  },
  idRole: {
    name: "id_role",
    type: DataTypes.INTEGER,
  },
  idPenjual: {
    name: "id_penjual",
    type: DataTypes.UUID,
  },
  idKategori: {
    name: "id_kategori",
    type: DataTypes.INTEGER,
  },
  idLelang: {
    name: "id_lelang",
    type: DataTypes.UUID,
  },
  idRuangDiskusi: {
    name: "id_ruang",
    type: DataTypes.UUID,
  },
};

export default foreignKeysData;
