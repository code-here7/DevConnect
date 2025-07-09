import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectData = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(storedUser);

    const fetchProjects = async () => {
      try {
        const res = await axios.get(`/api/project/userProject/${userId}`);
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error("Error fetching user projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  const handleAddFeedback = async (projectId) => {
    const comment = feedbacks[projectId]?.trim();
    if (!comment) return alert("Please write some feedback");
    if (!loggedInUser || !loggedInUser._id) return alert("User not found.");

    try {
      await axios.post(`/api/project/${projectId}/feedback`, {
        comment,
        commentedBy: loggedInUser._id,
      });

      setProjects((prev) =>
        prev.map((proj) =>
          proj._id === projectId
            ? {
                ...proj,
                feedback: [...(proj.feedback || []), { comment }],
              }
            : proj
        )
      );

      setFeedbacks((prev) => ({ ...prev, [projectId]: "" }));
    } catch (err) {
      console.error("Error adding feedback:", err.response?.data || err.message);
      alert("Failed to add feedback.");
    }
  };

  const backHome = () => navigate("/home");

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (projects.length === 0) return <div className="text-center mt-10">No projects found.</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-10">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <h1 className="text-3xl font-bold text-[#ff677d]">User Projects</h1>
        <input
          type="text"
          placeholder="Search by title..."
          className="border px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {projects
        .filter((project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((project) => (
          <div
            key={project._id}
            className="border border-gray-200 p-6 rounded-lg shadow-md space-y-4 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-[#fa841a]">{project.title}</h2>
            <p className="text-gray-800 text-sm">{project.description}</p>

            <div className="text-sm space-y-1">
              {project.githubLink && (
                <p>
                  💻 <span className="font-medium">GitHub:</span>{" "}
                  <a
                    href={project.githubLink}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.githubLink}
                  </a>
                </p>
              )}
              {project.liveLink && (
                <p>
                  🔗 <span className="font-medium">Live:</span>{" "}
                  <a
                    href={project.liveLink}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.liveLink}
                  </a>
                </p>
              )}
            </div>

            {/* Feedback display */}
            {project.feedback && project.feedback.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">💬 Feedback:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {project.feedback.map((fb, idx) => (
                    <li key={idx} className="leading-relaxed">{fb.comment}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Feedback input */}
            <div className="mt-4">
              <textarea
                rows="2"
                placeholder="Write your feedback..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={feedbacks[project._id] || ""}
                onChange={(e) =>
                  setFeedbacks((prev) => ({
                    ...prev,
                    [project._id]: e.target.value,
                  }))
                }
              ></textarea>
              <button
                onClick={() => handleAddFeedback(project._id)}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-md transition"
              >
                Add Feedback
              </button>
            </div>
          </div>
        ))}

      <div className="text-center pt-6">
        <button
          onClick={backHome}
          className="bg-[#ff677d] hover:bg-[#ff4c63] text-white px-6 py-2 rounded-full shadow transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProjectData;
