async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    return result.url;
  } catch (error) {
    console.error('Error in cloudinaryUtility - uploadImage:', error);
    throw error;  // Rethrowing the error to be caught in the calling function
  }
}
