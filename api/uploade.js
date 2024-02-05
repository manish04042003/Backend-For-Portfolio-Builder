const cloudinary = require('cloudinary').v2;
const multer = require('multer')
require('dotenv').config()

cloudinary.config({ 
    cloud_name: 'dbi8rj1xe', 
    api_key: process.env.api_key_cloudinary, 
    api_secret: process.env.api_secret_cloudinary 
});

// Set up multer storage and file filter
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imageupload = async(req,res) => {
    const fileData = req.file.buffer;
    const uploadResult = await new Promise((resolve) => {
      cloudinary.uploader.upload_stream((error, uploadResult) => {
          return resolve(uploadResult);
      }).end(fileData);
    });
  
    console.log(uploadResult)
    res.json({
        "message" : "ok",
        "url" : uploadResult.secure_url
    })
  };


module.exports = {upload,imageupload}