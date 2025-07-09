import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/api/project/userProject/${userId}`);
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`/api/project/deleteProject/${id}`);
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      return alert("Title and Description are required");
    }

    try {
      const res = await axios.post("/api/project/createProject", {
        ...newProject,
        user: userId,
      });
      setProjects((prev) => [...prev, res.data.project]);
      setNewProject({ title: "", description: "", githubLink: "", liveLink: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Add project failed:", err);
    }
  };

  const handleEdit = (proj) => {
    setEditingId(proj._id);
    setEditData({
      title: proj.title,
      description: proj.description,
      githubLink: proj.githubLink,
      liveLink: proj.liveLink,
    });
  };

  const handleEditSubmit = async (id) => {
    try {
      const res = await axios.put(`/api/project/updateProject/${id}`, editData);
      setProjects((prev) =>
        prev.map((proj) => (proj._id === id ? res.data.project : proj))
      );
      setEditingId(null);
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <button
          onClick={() => navigate("/home")}
          className="text-sm bg-[#ff677d] text-white px-4 py-2 rounded hover:bg-[#ff4c63] transition"
        >
          Home
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-[#ff677d] text-center flex-1">
          My Projects
        </h1>

        <input
          type="text"
          placeholder="Search Projects..."
          className="text-sm border px-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-600">No projects found.</p>
      ) : (
        filteredProjects.map((proj) => (
          <div
            key={proj._id}
            className="border p-5 rounded-lg shadow space-y-2 relative"
          >
            {editingId === proj._id ? (
              <>
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <textarea
                  className="w-full border px-2 py-1 rounded"
                  rows="2"
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="GitHub"
                  value={editData.githubLink}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, githubLink: e.target.value }))
                  }
                />
                <input
                  type="text"
                  className="w-full border px-2 py-1 rounded"
                  placeholder="Live Link"
                  value={editData.liveLink}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, liveLink: e.target.value }))
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditSubmit(proj._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#fa841a]">{proj.title}</h2>
                <p className="text-gray-700">{proj.description}</p>
                <div className="text-sm text-blue-600 space-y-1">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer">
                      💻 GitHub
                    </a>
                  )}
                  <br />
                  {proj.liveLink && (
                    <a href={proj.liveLink} target="_blank" rel="noreferrer">
                      🔗 Live
                    </a>
                  )}
                </div>
                <div className="absolute top-3 right-4 flex gap-2">
                  <button
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(proj._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(proj)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}

      {/* Add Project Button */}
      <div className="text-center">
        <button
          className="mt-4 px-4 py-2 bg-[#FA841A] text-white rounded-full hover:bg-[#FDA300] transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Add Project"}
        </button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <div className="mt-6 bg-[#fefefe] p-6 rounded-xl border shadow-md space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border px-3 py-2 rounded"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <textarea
            rows={3}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="GitHub Link"
            className="w-full border px-3 py-2 rounded"
            value={newProject.githubLink}
            onChange={(e) =>
              setNewProject({ ...newProject, githubLink: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Live Link"
            className="w-full border px-3 py-2 rounded"
            value={newProject.liveLink}
            onChange={(e) =>
              setNewProject({ ...newProject, liveLink: e.target.value })
            }
          />
          <button
            className="bg-[#ff677d] text-white px-4 py-2 rounded hover:bg-[#ff4c63] transition"
            onClick={handleAddProject}
          >
            Submit Project
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
