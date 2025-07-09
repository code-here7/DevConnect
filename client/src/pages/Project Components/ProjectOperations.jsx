// ProjectOperations.jsx
import axios from "axios";

// CREATE new project
export const createProject = (data) => axios.post("/api/projects/create", data);

// GET all projects
export const getAllProjects = () => axios.get("/api/projects/all");

// GET projects by a specific user
export const getProjectsByUser = (userId) => axios.get(`/api/projects/user/${userId}`);

// GET single project by ID
export const getProjectById = (id) => axios.get(`/api/projects/${id}`);

// UPDATE a project
export const updateProject = (id, updatedData) => axios.put(`/api/projects/${id}`, updatedData);

// DELETE a project
export const deleteProject = (id) => axios.delete(`/api/projects/${id}`);

// ADD feedback to a project
export const addFeedback = (projectId, feedbackData) =>
  axios.post(`/api/projects/${projectId}/feedback`, feedbackData);

// SEARCH projects (by title or user)
export const searchProjects = (query) =>
  axios.get(`/api/projects/search/${query}`);
