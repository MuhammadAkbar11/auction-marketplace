import multer from "multer";
import dayjs from "dayjs";
import path from "path";

const __dirname = path.resolve();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payments");
  },
  filename: (req, file, cb) => {
    const filenameToArr = file.originalname.split(" ").join("").split(".");
    const fileName = req.body.id_transaksi || "";
    const ext = filenameToArr[filenameToArr.length - 1];
    const resultFileName = `BaeBid-${fileName}_${dayjs().format(
      "YYYY-MM-DD"
    )}.${ext}`;
    // const resultFileName = `BaeBid-${fileName}_}.${ext}`;
    cb(null, resultFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Failed to upload!"), false);
  }
};

export const multerConfig = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("file");

// const uploadMultiFiles

const updatePaymentProof = (req, res, next) => {
  multerConfig(req, res, function (err) {
    let file = {
      type: "success",
      message: "Upload file success",
      data: req.file,
    };
    console.log(req.file, "file here");
    if (err instanceof multer.MulterError) {
      file = {
        type: "error",
        message: "Failed to upload",
        data: null,
      };
      req.fileimg = file;
      next();
    } else if (err) {
      file = {
        type: "error",
        message: "Failed to upload",
        data: null,
      };
      req.fileimg = file;
      next();
    } else {
      if (req.file === undefined) {
        file = {
          type: "error",
          message: "Please upload your file",
          data: null,
        };
      }
      req.fileimg = file;
      next();
    }
  });
};

export const uploadPaymentProofMiddleware = updatePaymentProof;

// export default uploadFilesMiddleware ;
