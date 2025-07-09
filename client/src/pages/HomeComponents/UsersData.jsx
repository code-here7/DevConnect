import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const UsersData = () => {
  const [profiles, setProfiles] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("/api/profile/getAllProfiles");
        setProfiles(res.data.profiles);
      } catch (err) {
        console.error("Failed to fetch profiles", err);
      }
    };
    fetchProfiles();
  }, []);

const getProject = (userId) => {
  // console.log(userId);
  navigate(`/projectData/${userId}`);
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#024089]">All Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition transform hover:scale-[1.02]"
          >
            <img
              src={profile.profilepic || "https://via.placeholder.com/150?text=No+Image"}
              alt="User"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-[#004DA9]">{profile.user?.fullName}</h3>
            <p className="text-sm text-gray-600">{profile.role}</p>
            <p className="text-sm italic text-gray-500">{profile.headline}</p>
            <div className="mt-4">
              <button
              onClick={() => getProject(profile.user?._id)}
                className="px-4 py-2 bg-[#FA841A] text-white rounded-full hover:bg-[#FDA300] transition"
              >
                Projects
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersData;
