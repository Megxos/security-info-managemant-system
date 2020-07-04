const imageProcessor = require("./imageController");
const multer = require("multer");

const parser = multer({
    storage: imageProcessor.saveImage()
});

module.exports  = parser;
