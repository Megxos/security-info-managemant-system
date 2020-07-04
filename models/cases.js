const mongoose = require("mongoose")

    caseSchema = new mongoose.Schema({
        name: String,
        matric_number: String,
        department: String,
        gender: String,
        description_1: String,
        description_2: { type:String, default: "No addidtional detail provided" },
        image: {
            url: String,
            id: String
        },
        rating: {
            type: Number,
            default: 1
        },
        is_open:{ type: Boolean, default:  1},
        reported_by: String,
        date_committed: Date,
        date_reported: {type: Date, default: Date.now()}
    })
    console.log("connected cases")
    module.exports = mongoose.model("case", caseSchema)