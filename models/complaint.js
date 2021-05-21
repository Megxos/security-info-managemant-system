const { model, Schema } = require("mongoose");

const complaintSchema = new Schema(
  {
    name: { type: String, required: true },
    matric_no: { type: String, required: true },
    department: { type: String, required: true },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model("complaint", complaintSchema);
