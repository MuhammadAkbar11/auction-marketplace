import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import sequelize from "./configs/database.js";
import Sequelize from "sequelize";
import ModelMember from "./models/m_member.js";
import ModelPenjual from "./models/m_penjual.js";
import ForeignKeysData from "./configs/table_foreignKey.js";
import ModelRole from "./models/m_roles.js";
import ModelLelang from "./models/m_lelang.js";
import ModelKategori from "./models/m_kategori.js";
import ModelPenawaran from "./models/m_penawaran.js";
import ModelPesanDiskusi from "./models/m_pesan_diskusi.js";
import ModelRuangDiskusi from "./models/m_ruang_diskusi.js";

const DataTypes = Sequelize.DataTypes;

const __dirname = path.resolve();

let envFile = ".env";
if (process.argv[2] === "--dev") {
  envFile = ".env.dev";
}

dotenv.config({
  path: envFile,
});

const app = express();

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running dude!! ");
});

ModelRole.hasMany(ModelMember);
ModelMember.belongsTo(ModelRole, {
  constraints: false,
  foreignKey: ForeignKeysData.idRole,
});

// relasi antara Penjual dan Member
ModelMember.hasOne(ModelPenjual);
ModelPenjual.belongsTo(ModelMember, {
  foreignKey: ForeignKeysData.idMember,
});
ModelPenjual.hasMany(ModelLelang);
ModelLelang.belongsTo(ModelPenjual, { foreignKey: ForeignKeysData.idPenjual });

// relasi tabel lelang & kategori
ModelLelang.belongsTo(ModelKategori, {
  foreignKey: ForeignKeysData.idKategori,
});
ModelKategori.hasMany(ModelLelang);

// relasi Tabel penawran dengan lelang
ModelLelang.hasMany(ModelPenawaran);
ModelPenawaran.belongsTo(ModelLelang, { foreignKey: ForeignKeysData.idLelang });
ModelMember.hasMany(ModelPenawaran);
ModelPenawaran.belongsTo(ModelMember, {
  foreignKey: ForeignKeysData.idMember,
});

// relasi antara member dan pesan
ModelMember.hasMany(ModelPesanDiskusi);
ModelPesanDiskusi.belongsTo(ModelMember, {
  foreignKey: ForeignKeysData.idMember,
});
ModelRuangDiskusi.hasMany(ModelPesanDiskusi);
ModelPesanDiskusi.belongsTo(ModelRuangDiskusi, {
  foreignKey: ForeignKeysData.idRuangDiskusi,
});
ModelLelang.hasOne(ModelRuangDiskusi);
ModelRuangDiskusi.belongsTo(ModelLelang, {
  foreignKey: ForeignKeysData.idLelang,
});

(async () => {
  await sequelize.sync({ force: true });

  app.listen(PORT, () => {
    console.log(
      `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
    );
  });
})();
