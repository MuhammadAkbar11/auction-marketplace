import multer from "multer";
import dayjs from "dayjs";
import path from "path";

const __dirname = path.resolve();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/members");
  },
  filename: (req, file, cb) => {
    const filenameToArr = file.originalname.split(" ").join("").split(".");
    const fileName = req.user.id_member;
    const ext = filenameToArr[filenameToArr.length - 1];
    cb(
      null,
      `Baebid-${fileName}_${dayjs().format("YYYY-MM-DD-HHmmss")}.${ext}`
    );
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

const upadteMemberPhoto = (req, res, next) => {
  multerConfig(req, res, function (err) {
    let file = {
      type: "success",
      message: "Upload file success",
      data: req.file,
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

export const uploadMemberPhotoMiddleware = upadteMemberPhoto;

// export default uploadFilesMiddleware ;
