const cloudinary = require('cloudinary').v2;

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.url;
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadImage };
