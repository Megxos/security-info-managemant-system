const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      sparse: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    is_super_admin: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    reset_token: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", adminSchema);
