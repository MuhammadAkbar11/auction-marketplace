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
