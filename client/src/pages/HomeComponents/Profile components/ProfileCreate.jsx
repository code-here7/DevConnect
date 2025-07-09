import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileCreate = () => {
  const [headline, setHeadline] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");

  const navigate = useNavigate();

const handleCreateProfile = async (e) => {
  e.preventDefault();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  console.log(userId);
  if (!userId) return alert("User not found. Please login again.");

  const profileData = {
    userId,       
    headline,
    role,
    bio,
    skills,
    github,
    linkedin,
    website,
  };

  try {
    const res = await axios.post("/api/profile/createProfile", profileData);
    alert("Profile created successfully!");
    navigate("/home");
  } catch (err) {
    alert(err.response?.data?.msg || "Profile creation failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dcedc1] via-[#ffd3b5] to-[#ffaaa5] shadow-2xl border border-[#ffd3b5]">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-[#ff677d] mb-6 text-center">Create Profile</h2>
        <form onSubmit={handleCreateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[#ff677d] font-semibold mb-1">Bio</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={500}
              className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[#ff677d] font-semibold mb-1">Skills (comma separated)</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>

          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">GitHub</label>
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">LinkedIn</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[#ff677d] font-semibold mb-1">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#ff677d] text-white py-2 rounded-md font-bold hover:bg-[#ff4c63] transition duration-200"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCreate;
