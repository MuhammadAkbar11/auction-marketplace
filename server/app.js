import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";
import sequelize from "./configs/database.js";

import ModelMember from "./models/m_member.js";
import ModelPenjual from "./models/m_penjual.js";
import foreignKeysData from "./database/foreignKeys.js";
import ModelRole from "./models/m_roles.js";
import ModelLelang from "./models/m_lelang.js";
import ModelKategori from "./models/m_kategori.js";
import ModelPenawaran from "./models/m_penawaran.js";
import ModelPesanDiskusi from "./models/m_pesan_diskusi.js";
import ModelRuangDiskusi from "./models/m_ruang_diskusi.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

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

const staticFile = express.static(path.join(__dirname, "..", "uploads"));
app.use("/files/uploads", staticFile);

app.get("/api", (req, res) => {
  res.send("API is Running dude!! ");
});
app.use("/api/auth", authRoutes);
app.use(notFound);
app.use(errorHandler);

ModelRole.hasMany(ModelMember);
ModelMember.belongsTo(ModelRole, {
  constraints: false,
  foreignKey: foreignKeysData.idRole,
});

// relasi antara Penjual dan Member
ModelMember.hasOne(ModelPenjual);
ModelPenjual.belongsTo(ModelMember, {
  foreignKey: foreignKeysData.idMember,
});
ModelPenjual.hasMany(ModelLelang);
ModelLelang.belongsTo(ModelPenjual, { foreignKey: foreignKeysData.idPenjual });

// relasi tabel lelang & kategori
ModelLelang.belongsTo(ModelKategori, {
  foreignKey: foreignKeysData.idKategori,
});
ModelKategori.hasMany(ModelLelang);

// relasi Tabel penawran dengan lelang
ModelLelang.hasMany(ModelPenawaran);
ModelPenawaran.belongsTo(ModelLelang, { foreignKey: foreignKeysData.idLelang });
ModelMember.hasMany(ModelPenawaran);
ModelPenawaran.belongsTo(ModelMember, {
  foreignKey: foreignKeysData.idMember,
});

// relasi antara member dan pesan
ModelMember.hasMany(ModelPesanDiskusi);
ModelPesanDiskusi.belongsTo(ModelMember, {
  foreignKey: foreignKeysData.idMember,
});
ModelRuangDiskusi.hasMany(ModelPesanDiskusi);
ModelPesanDiskusi.belongsTo(ModelRuangDiskusi, {
  foreignKey: foreignKeysData.idRuangDiskusi,
});
ModelLelang.hasOne(ModelRuangDiskusi);
ModelRuangDiskusi.belongsTo(ModelLelang, {
  foreignKey: foreignKeysData.idLelang,
});

(async () => {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(
      `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
    );
  });
})();
