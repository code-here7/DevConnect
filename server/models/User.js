const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Female", "Male", "Other"], required: true },
  password: { type: String, required: true },
  location: { type: String },
  contactNumber: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
