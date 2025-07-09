const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {} = require("../controllers/projectControllers");
const {
  createProject,
  getAllProjects,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
  addFeedback,
  searchProjects,
} = require("../controllers/projectControllers");

router.post("/createProject", createProject);

router.get("/allProject", getAllProjects);

router.get("/project/:id", getProjectById);

router.get("/userProject/:userId", getProjectsByUser);

router.put("/updateProject/:id", updateProject);

router.delete("/deleteProject/:id", deleteProject);

router.post("/:id/feedback", addFeedback);

router.get("/search/:query", searchProjects);

module.exports = router;
