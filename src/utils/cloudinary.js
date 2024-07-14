import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload file on cloudinary;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file upload successfully
        console.log("File Upload Successfully", response.url);
        return response;
    }
    catch (err) {
        fs.unlinkSync(localFilePath); // remove locally saved temp file
        return null;
    }
}

export { uploadOnCloudinary };