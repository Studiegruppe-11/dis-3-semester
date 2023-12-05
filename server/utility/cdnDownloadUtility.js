// root/server/utility/cdnDownloadUtility.js

const cloudinary = require('cloudinary').v2;

// Function to fetch images from Cloudinary
async function fetchImagesFromCloudinary(folderName) {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${folderName}`) // Adjust the folder name accordingly
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    return resources.map(file => file.url);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw error; // Rethrow the error for handling it in the calling function
  }
}

module.exports = { fetchImagesFromCloudinary };
