// root/server/routes/imageRoute.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { uploadImage } = require('../utility/multipleImgUploadUtility.js');
const { fetchImagesFromCloudinary } = require('../utility/cdnUploadUtility.js');


// Set up multer for memory storage and file size limits
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }); // 5MB limit

// Route to handle multiple image uploads
router.post('/upload/images', upload.array('image', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const uploadPromises = req.files.map(async file => {
            const tmpFilePath = path.join(__dirname, '../../uploads/', file.originalname);
            fs.writeFileSync(tmpFilePath, file.buffer);
            const result = await uploadImage(tmpFilePath);
            fs.unlinkSync(tmpFilePath);
            return result.url;
        });

        const results = await Promise.all(uploadPromises);
        res.status(200).json({ message: 'Images uploaded successfully', urls: results });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Error uploading images');
    }
});

// Route to fetch images from Cloudinary
router.get('/fetch', async (req, res) => {
    try {
      const images = await fetchImagesFromCloudinary('your_folder_name'); // Replace with your folder name
      res.json(images);
    } catch (error) {
      console.error('Error in route - fetching images:', error);
      res.status(500).send('Error fetching images');
    }
  });


module.exports = router;
