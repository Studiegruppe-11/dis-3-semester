router.post('/upload/images', async (req, res) => {
    try {
      if (!req.files || !req.files.image) {
        throw new Error('No image file(s) provided');
      }
  
      let uploadPromises = [];
      if (Array.isArray(req.files.image)) {
        uploadPromises = req.files.image.map(file => uploadImage(file.tempFilePath));
      } else {
        uploadPromises = [uploadImage(req.files.image.tempFilePath)];
      }
  
      const results = await Promise.all(uploadPromises);
      res.status(200).json({ message: 'Images uploaded successfully', urls: results });
    } catch (error) {
      console.error('Error in imageRoute - upload/images:', error);
      res.status(500).send(`Error uploading images: ${error.message}`);
    }
  });
  