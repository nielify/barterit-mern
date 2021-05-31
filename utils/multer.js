const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './images')
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + '--' + file.originalname);
  }
});

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;