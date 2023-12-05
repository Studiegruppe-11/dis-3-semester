// root/server/utility/cloudinaryUtility.js
const cloudinary = require('cloudinary').v2;

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.url;
  } catch (error) {
    console.error('Error in cloudinaryUtility - uploadImage:', error, error.msg, error.stack);
    throw error;  // Rethrowing the error to be caught in the calling function
  }
}


module.exports = { uploadImage };
