const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadImage } = require('../utility/multipleImgUploadUtility.js');
const fs = require('fs');
const path = require('path');

// Set up multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    } });

router.post('/upload/images', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imageBuffer = req.file.buffer;
        const filename = req.file.originalname;
        const tmpFilePath = path.join(__dirname, '../../uploads/', filename);

        // Write the buffer to a temporary file
        fs.writeFileSync(tmpFilePath, imageBuffer);

        // Upload to Cloudinary
        const result = await uploadImage(tmpFilePath);

        // Delete the temporary file
        fs.unlinkSync(tmpFilePath);

        res.status(200).json({ message: 'Image uploaded successfully', url: result });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image');
    }
});

module.exports = router;
