// root/server/routes/imageRoute.js
const express = require('express');
const router = express.Router();
const { uploadImage } = require('../utility/cloudinaryUtility.js'); // Utility module for Cloudinary

router.post('/upload', async (req, res) => {
  try {
    let uploadPromises = [];
    // Check if multiple files are uploaded
    if (req.files.image.length) {
      uploadPromises = req.files.image.map(file => uploadImage(file.tempFilePath));
    } else {
      // Single file upload
      uploadPromises = [uploadImage(req.files.image.tempFilePath)];
    }

    const results = await Promise.all(uploadPromises);
    res.status(200).json({ message: 'Images uploaded successfully', urls: results });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).send('Error uploading images');
  }
});

module.exports = router;
