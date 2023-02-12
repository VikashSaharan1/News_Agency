const util = require("util");
const multer = require("multer");
const path = require('path');
var fs = require('fs');
const maxSize = 2 * 1024 * 1024;

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
];

let storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    var dir =  __basedir + "/resources/static/assets/uploads";
    const directory = `${dir}/${req.headers.authorization}/`

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
      }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, 'image-'+ + Date.now() + path.extname(file.originalname));
  },
  
});
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    return cb(new Error('file is not allowed'))
  }
}
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
   
   // checkFileType(file, cb)
   return cb(null,true);
  }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;