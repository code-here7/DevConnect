// controllers/projectControllers.js
const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { user, title, description, liveLink, githubLink } = req.body;
    if (!user || !title || !description) {
      return res.status(400).json({ success: false, msg: "Missing required fields" });
    }

    const project = await Project.create({
      user,
      title,
      description,
      liveLink,
      githubLink
    });

    res.status(201).json({ success: true, msg: "Project created", project });
  } catch (e) {
    console.error("Create Project Error:", e);
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "fullName email").sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, msg: "Project not found" });
    res.status(200).json({ success: true, project });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};

// Get projects by user ID
const getProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProject) return res.status(404).json({ success: false, msg: "Project not found" });

    res.status(200).json({ success: true, msg: "Project updated", project: updatedProject });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Update failed", error: e.message });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, msg: "Project not found" });

    res.status(200).json({ success: true, msg: "Project deleted" });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Delete failed", error: e.message });
  }
};

// Add feedback to a project
const addFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, commentedBy } = req.body;
    if (!comment || !commentedBy) {
      return res.status(400).json({ success: false, msg: "Missing feedback data" });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, msg: "Project not found" });

    project.feedback.push({ comment, commentedBy });
    await project.save();

    res.status(200).json({ success: true, msg: "Feedback added", feedback: project.feedback });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Add feedback failed", error: e.message });
  }
};

// Search projects by title
const searchProjects = async (req, res) => {
  try {
    const { query } = req.params;
    const results = await Project.find({
      title: { $regex: query, $options: "i" }
    });
    res.status(200).json({ success: true, results });
  } catch (e) {
    res.status(500).json({ success: false, msg: "Search failed", error: e.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
  addFeedback,
  searchProjects
};
