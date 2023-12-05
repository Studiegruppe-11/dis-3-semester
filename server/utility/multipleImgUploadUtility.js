// root/server/utility/multipleImgUploadUtility.js
const cloudinary = require('cloudinary').v2;

async function uploadImage(imagePath) {
  try {
    // Add the folder parameter here
    const result = await cloudinary.uploader.upload(imagePath, { folder: "joebilleder" });
    return result.url;
  } catch (error) {
    console.error('Error in cloudinaryUtility - uploadImage:', error, error.msg, error.stack);
    throw error;  // Rethrowing the error to be caught in the calling function
  }
}


module.exports = { uploadImage };
