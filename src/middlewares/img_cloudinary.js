const cloudinary=require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'du5wkufyy',
  api_key: process.env.CLOUDINARY_API_KEY || 397426312985589,
  api_secret: process.env.CLOUDINARY_API_SECRET || 'fODm6lgeCrr2Z8S9_CylhoRiIeM',
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response=await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file is uploaded successfully");
  //   fs.unlinkSync(localFilePath);
    return response;
  } 
  catch (err) {
    // fs.unlinkSync(localFilePath);
    // //it remove the the temperory file if failed
    console.log(err)
    return null;
  }
};

module.exports= { uploadOnCloudinary };