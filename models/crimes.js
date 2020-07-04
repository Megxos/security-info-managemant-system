const mongoose = require("mongoose"),
            Offender = require("./offenders")

crimeSchema = new mongoose.Schema({
    offender: { offenderSchema },
    description_1: String,
    description_2: String,
    rating: Number,
    reported_by: String,
    date_committed: Date,
    date_reported: {
        type: Date,
        default: Date.now()
    }
})
console.log("connected crimes")

module.exports = mongoose.model("crime", crimeSchema)