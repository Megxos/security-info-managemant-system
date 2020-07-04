const mongoose = require("mongoose"),
            Cases           = require("./cases")

offenderSchema = new mongoose.Schema({
    name: String,
    matric_no: String,
    department: String
})
console.log("connected offenders")
module.exports = mongoose.model("offenders", offenderSchema)