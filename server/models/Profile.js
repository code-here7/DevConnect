const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  headline: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  profilepic: {
    type: String, // can be a URL uploaded or avtar image if not uploded
    default: ""
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  skills: {
    type: [String],
    default: []
  },
  github: {
    type: String,
    default: ""
  },
  linkedin: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
