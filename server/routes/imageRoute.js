const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadImage } = require('../utility/multipleImgUploadUtility.js');
const fs = require('fs');
const path = require('path');

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).fields([{ name: 'image', maxCount: 5 }]);

// Use upload.array for multiple files
router.post('/upload/images', upload, async (req, res) => {
  try {
      if (!req.files || req.files.length === 0) {
          return res.status(400).send('No files uploaded.');
      }

      // Process each file
      const uploadPromises = req.files.map(async file => {
          const tmpFilePath = path.join(__dirname, '../../uploads/', file.originalname);
          fs.writeFileSync(tmpFilePath, file.buffer);
          const result = await uploadImage(tmpFilePath);
          fs.unlinkSync(tmpFilePath);
          return result;
      });

      const results = await Promise.all(uploadPromises);
      res.status(200).json({ message: 'Images uploaded successfully', urls: results });
  } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).send('Error uploading images');
  }
});

module.exports = router;
