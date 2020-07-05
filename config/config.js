require("dotenv").config()
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

module.exports = connection = () => {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, success) => {
      if (err) {
        console.log("Database connection failed!");
        // process.exit();
      } else {
        console.log("Database connection success");
      }
    }
  );
};