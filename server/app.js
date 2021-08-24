import path from "path";
import dotenv from "dotenv";
import "colors";
import express from "express";
import http from "http";
import SocketApp from "./socker/socketio.js";
import sequelize from "./configs/database.js";
import bodyParser from "body-parser";
import ModelMember from "./models/m_member.js";
import foreignKeysData from "./database/foreignKeys.js";
import ModelLelang from "./models/m_lelang.js";
import ModelKategori from "./models/m_kategori.js";
import ModelPenawaran from "./models/m_penawaran.js";
import ModelPesanDiskusi from "./models/m_pesan_diskusi.js";
import ModelRuangDiskusi from "./models/m_ruang_diskusi.js";
import ModelAkunBank from "./models/m_akun_bank.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import auctionRoutes from "./routes/auction.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
import dumbRoutes from "./routes/dumb.routes.js";
import ModelGaleri from "./models/m_galeri_lelang.js";
import ModelAdmin from "./models/m_admin.js";
import ModelTransaksi from "./models/m_transaksi.js";
import ModelDetailTransaksi from "./models/m_detail_transaksi.js";
import ModelPengiriman from "./models/m_pengiriman.js";

const __dirname = path.resolve();
let envFile = ".env";
if (process.argv[2] === "--dev") {
  envFile = ".env.dev";
} else if (process.argv[2] === "--dev-debug") {
  envFile = ".env.local";
}

dotenv.config({
  path: envFile,
});

const PORT = process.env.PORT || 8080;
const MODE = process.env.NODE_ENV;

const app = express();
const server = http.createServer(app);

SocketApp(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const staticFile = express.static(path.join(__dirname, "uploads"));
console.log(staticFile, "==================");
app.use("/uploads", staticFile);

// app.use(uploadFilesMiddleware);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api", (req, res) => {
  res.send("API is Running dude!! ");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auction", auctionRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/dumb", dumbRoutes);
app.use(notFound);
app.use(errorHandler);

// const modelAdmin = new ModelAdmin();

ModelAdmin.sync();

ModelMember.hasMany(ModelLelang);
ModelLelang.belongsTo(ModelMember, { foreignKey: foreignKeysData.idMember });

// relasi tabel lelang & kategori
ModelLelang.belongsTo(ModelKategori, {
  foreignKey: foreignKeysData.idKategori,
});
ModelKategori.hasMany(ModelLelang);

ModelLelang.hasMany(ModelGaleri);
ModelGaleri.belongsTo(ModelLelang, { foreignKey: foreignKeysData.idLelang });

// relasi Tabel penawran dengan lelang
ModelLelang.hasMany(ModelPenawaran);
ModelPenawaran.belongsTo(ModelLelang, { foreignKey: foreignKeysData.idLelang });
ModelMember.hasMany(ModelPenawaran, { as: "member" });
ModelPenawaran.belongsTo(ModelMember, {
  foreignKey: foreignKeysData.idMember,
  as: "member",
});

ModelPenawaran.hasOne(ModelTransaksi);
ModelTransaksi.belongsTo(ModelPenawaran, {
  foreignKey: foreignKeysData.idTawaran,
});

ModelTransaksi.hasOne(ModelDetailTransaksi);
ModelDetailTransaksi.belongsTo(ModelTransaksi, {
  foreignKey: foreignKeysData.idTransaksi,
});
ModelTransaksi.hasOne(ModelPengiriman);
ModelPengiriman.belongsTo(ModelTransaksi, {
  foreignKey: foreignKeysData.idTransaksi,
});

ModelMember.hasMany(ModelAkunBank);
ModelAkunBank.belongsTo(ModelMember, { foreignKey: foreignKeysData.idMember });

// relasi antara member dan pesan
ModelMember.hasMany(ModelPesanDiskusi);
ModelPesanDiskusi.belongsTo(ModelMember, {
  foreignKey: foreignKeysData.idMember,
  as: "member",
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
  // await sequelize.sync({ force: true });
  server.listen(PORT, () => {
    console.log(
      `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
    );
  });
})();
