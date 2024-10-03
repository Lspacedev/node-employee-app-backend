const multer = require("multer");
//const multParse = multer();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    let id = "";

    if (typeof req.params.id !== "undefined") {
      id = req.params.id;
    } else {
      id = req.body.id;
    }
    let extension = "";
    if (JSON.stringify(file) !== "{}") {
      extension = file.originalname.substring(
        file.originalname.indexOf(".") + 1
      );
      cb(null, id + "." + extension);
    }
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
