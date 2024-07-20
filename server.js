const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({
  storage: storage,
  limits: {fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('csvfile');

// Check file type
function checkFileType(file, cb){
  const filetypes = /csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: CSV Files Only!');
  }
}

// Public folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.send({
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.send({
          msg: 'No file selected!'
        });
      } else {
        res.send({
          msg: 'File uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
