const multer = require("multer");

exports.uploadFile = (image, bookFile) => {
  // console.log(image, bookFile);
  const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  const fileFilter = function (req, file, cb) {
    if (file.fieldname === image) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = "Only image files are allowed!";
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    if (file.fieldname === bookFile) {
      if (!file.originalname.match(/\.(epub|EPUB|pdf|PDF)$/)) {
        req.fileValidationError = "Only Book files are allowed!";
        return cb(new Error("Only Book files are allowed!"), false);
      }
    }

    cb(null, true);
  };

  const sizeInMB = 30;
  const maxSize = sizeInMB * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: image,
      maxCount: 1,
    },
    {
      name: bookFile,
      maxCount: 1,
    },
  ]);

  return (req, res, next) => {
    upload(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }

      // if (!req.files && !err) {
      //   return res.status(400).send({
      //     message: "please select file to upload",
      //   });
      // }

      if (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "max file sized 30MB",
          });
        }

        return res.status(400).send(err);
      }

      return next();
    });
  };
};