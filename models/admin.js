const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("admin", adminSchema);
