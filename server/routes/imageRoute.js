const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Route to handle image upload
router.post('/upload', async (req, res) => {
  try {
    // Assuming a file upload form with the input field named 'image'
    if(req.files && req.files.image){
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath);
      return res.status(200).json({ message: 'Image uploaded successfully', url: result.url });
    } else {
      return res.status(400).json({ message: 'No image file provided' });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;
