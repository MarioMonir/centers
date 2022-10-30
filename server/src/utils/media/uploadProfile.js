const multer = require("multer");

// --------------------------------------------------------

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    // const ext = file.mimetype.split("/")[1];
    //name the file with the user id and the current time
    cb(null, file.originalname.split(".")[0] + "." + "png");
  },
});

// --------------------------------------------------------

const isImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// --------------------------------------------------------

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

// --------------------------------------------------------

exports.uploadImage = upload.single("photo");
exports.upload = (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
};
