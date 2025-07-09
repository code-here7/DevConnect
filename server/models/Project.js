const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  liveLink: {
    type: String,
    default: ""
  },
  githubLink: {
    type: String,
    default: ""
  },
  feedback: [feedbackSchema]
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
