const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ".");
  },
  filename: (req, file, cb) => {
    const prefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${prefix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
module.exports = upload;
