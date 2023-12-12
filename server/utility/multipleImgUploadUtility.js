// root/server/utility/multipleImgUploadUtility.js
const cloudinary = require('cloudinary').v2;

// Funktion til at uploade flere billeder af gangen til Cloudinary, tager stien til billederne som parameter. Disse vælges i frontend. 
async function uploadImage(imagePath) {
  try {
    // Upload billedet til Cloudinary og returner URL'en
    const result = await cloudinary.uploader.upload(imagePath, { folder: "joebilleder" });
    return result.url;
  } catch (error) {
    console.error('Error in cloudinaryUtility - uploadImage:', error, error.msg, error.stack);
    throw error;  // Fejl videre til håndtering
  }
}

module.exports = { uploadImage };
