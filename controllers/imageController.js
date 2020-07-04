require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage }  = require("multer-storage-cloudinary");

module.exports = {
    saveImage(){
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: (req, file) => "information-security",
                format: async (req, file) => 'jpg',
                height: '500',
                width: '500',
            },
        });
        return storage;
    }
}