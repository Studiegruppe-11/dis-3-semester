// root/server/routes/imageRoute.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Importer hjælpefunktioner til upload og hentning af billeder
const { uploadImage } = require('../utility/multipleImgUploadUtility.js');
const { fetchImagesFromCloudinary } = require('../utility/cdnFetchUtility.js');

// Konfigurer multer til hukommelseslagring og filstørrelsesgrænser
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }); // 5MB grænse

// Rute til håndtering af upload af flere billeder
router.post('/upload/images', upload.array('image', 8), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('Ingen filer uploadet.');
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

        const results = await Promise.all(uploadPromises);
        console.log(results);
        res.status(200).json({ message: 'Billeder uploadet med succes', urls: results }); 
    } catch (error) {
        console.error('Fejl ved upload af billeder:', error);
        res.status(500).send('Fejl ved upload af billeder');
    }
});

// Rute til at hente billeder fra Cloudinary
router.get('/fetch', async (req, res) => {
    try {
      const images = await fetchImagesFromCloudinary('joebilleder');
      res.json(images);
    } catch (error) {
      console.error('Fejl i rute - henter billeder:', error);
      res.status(500).send('Fejl ved hentning af billeder');
    }
  });

module.exports = router;
