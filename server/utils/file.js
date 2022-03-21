import fs from "fs";
import path from "path";

export const __dirname = path.resolve();

export const deleteFile = filePath => {
  fs.unlink(path.join(__dirname, filePath), err => {
    if (err) {
      throw new Error(err);
    }
  });
};

export const checkIsGuestFoto = file => {
  const defaultFoto = ["guest.jpg", "guest.png", "guest.jpeg"];
  const fileToArr = file.split("/");
  const fileName = fileToArr[fileToArr.length - 1];
  return defaultFoto.some(f => f === fileName);
};
