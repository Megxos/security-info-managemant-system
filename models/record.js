const mongoose = require("mongoose");

caseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    matric_number: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true },
    crime: { type: String, required: true },
    description: {
      type: String,
      default: "No addidtional detail provided",
    },
    images: [
      {
        url: String,
        id: String,
        contentType: String,
        buffer: Buffer,
      },
    ],
    rating: {
      type: Number,
      default: 1,
    },
    is_open: { type: Boolean, default: true },
    reported_by: String,
    date_committed: Date,
    date_reported: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
console.log("connected cases");
module.exports = mongoose.model("case", caseSchema);
