// root/server/routes/imageRoute.js

// Nødvendige modulers
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Henter funktioerne uploadImage og fetchImagesFromCloudinary 
const { uploadImage } = require('../utility/multipleImgUploadUtility.js');
const { fetchImagesFromCloudinary } = require('../utility/cdnFetchUtility.js');
s
// Definerer multer storage og upload, som er nødvendigt for at håndtere upload af flere billeder ad gangen
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }); // 5MB limit

// Route til at håndtere upload af flere billeder ad gangen
router.post('/upload/images', upload.array('image', 8), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        const uploadPromises = req.files.map(async file => {
            const tmpFilePath = path.join(__dirname, '../../uploads/', file.originalname);
            fs.writeFileSync(tmpFilePath, file.buffer);
            const result = await uploadImage(tmpFilePath);
            fs.unlinkSync(tmpFilePath);
            console.log(result);
            console.log(result.url);
            return result;
        });

        const results = await Promise.all(uploadPromises); // Gemmer alle promises i et array
        console.log(results);
        res.status(200).json({ message: 'Images uploaded successfully', urls: results }); // Sender et json objekt med urls tilbage til klienten
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).send('Error uploading images');
    }
});

// Route til at fetche billeder fra Cloudinary
router.get('/fetch', async (req, res) => {
    try {
      const images = await fetchImagesFromCloudinary('joebilleder');
      res.json(images);
    } catch (error) {
      console.error('Error in route - fetching images:', error);
      res.status(500).send('Error fetching images');
    }
  });

module.exports = router;
