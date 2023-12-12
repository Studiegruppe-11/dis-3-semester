// root/server/utility/cdnDownloadUtility.js

const cloudinary = require('cloudinary').v2;

// Funktion til at fetche billeder fra Cloudinary, tager mappenavn som parameter
async function fetchImagesFromCloudinary(folderName) {
  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${folderName}`) 
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

    return resources.map(file => file.url);
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    throw error; // Fejl videre til håndtering
  }
}

module.exports = { fetchImagesFromCloudinary };
