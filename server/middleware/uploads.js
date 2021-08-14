import multer from "multer";
import dayjs from "dayjs";
import path from "path";

const __dirname = path.resolve();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/auctions");
  },
  filename: (req, file, cb) => {
    const filenameToArr = file.originalname.split(" ").join("").split(".");
    const fileName = req.body.judul.split(" ").join("-");
    const ext = filenameToArr[filenameToArr.length - 1];
    cb(null, `BaeBid-${fileName}_${dayjs().valueOf()}.${ext}`);
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
}).array("files", 6);

// const uploadMultiFiles

const uploadImages = (req, res, next) => {
  multerConfig(req, res, function (err) {
    let file = {
      type: "success",
      message: "Upload file success",
      data: req.files,
    };

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
      if (req.files === undefined) {
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

export const uploadFilesMiddleware = uploadImages;

// export default uploadFilesMiddleware ;
