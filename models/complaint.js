const { model, Schema } = require("mongoose");

const complaintSchema = new Schema(
  {
    name: { type: String, required: true },
    matric_no: { type: String },
    department: { type: String },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    date: { type: Date, default: Date.now },
    number: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("complaint", complaintSchema);
