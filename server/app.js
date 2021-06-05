import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import express from "express";

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

app.listen(PORT, () => {
  console.log(
    `\nServer running in ${MODE} mode on port ${PORT.underline} `.yellow.bold
  );
});
