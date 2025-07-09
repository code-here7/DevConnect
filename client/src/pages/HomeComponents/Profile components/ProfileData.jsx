import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ProfileData = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
        const userId = storedUser?._id;
        const response = await axios.get(`/api/profile/getProfile/${userId}`);
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

 const myProject = (userId) => {
  navigate(`/myProject/${userId}`)
 }

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    navigate("/");
    setTimeout(() => {
      localStorage.clear();
    }, 100);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg w-full p-6 flex flex-col gap-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#ff4c63] mb-6 text-center">
        Welcome, <span className="text-black">{user?.fullName || "Guest"}</span>
      </h1>

      {profile ? (
        <>
          <p className="text-green-600 font-medium mb-6 text-center">
            Your profile is already created 🎉
          </p>

          <div className="bg-[#fdfdfd] p-6 rounded-xl shadow-inner text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
              <div className="flex items-center gap-6">
                <img
                  src={profile.profilepic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-[#ff677d] shadow-md"
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-[#ff677d]">{user?.fullName}</h2>
                  <p className="text-gray-600">{profile.headline}</p>
                </div>
              </div>

              <div className="sm:self-start text-center sm:text-right">
                <button
                  onClick={() => myProject(profile.user?._id)}
                  className="px-4 py-2 bg-[#FA841A] text-white rounded-full hover:bg-[#FDA300] transition"
                >
                  Projects
                </button>
              </div>
            </div>


            <p className="text-gray-700 italic mb-4 break-words">{profile.bio}</p>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Role:</h3>
              <p>{profile.role}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Skills:</h3>
              <ul className="list-disc list-inside text-gray-700 ml-2">
                {profile.skills?.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#024089] px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#024089] px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                LinkedIn
              </a>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#024089] px-4 py-2 rounded-lg hover:bg-[#ff4c63] transition"
              >
                Website
              </a>
            </div>


          </div>
        </>
      ) : (
        <>
          <p className="text-yellow-700 font-medium mb-4 text-center">
            You haven't created a profile yet.
          </p>
          <div className="bg-[#fdfdfd] p-6 rounded-xl shadow-inner text-left">
            <div className="text-center">
              <button
                onClick={() => navigate("/profileCreate")}
                className="bg-[#ff677d] text-white px-6 py-2 rounded-md font-bold hover:bg-[#ff4c63] transition"
              >
                Create Profile
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-600 leading-relaxed text-center px-4">
              <div className="mt-6 text-lg leading-relaxed text-gray-700">
                <p>
                  A strong developer profile not only highlights your skills and experience, but also builds credibility within the community.
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Create yours today and let your work speak for itself!
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Stand out from the crowd and get noticed by top collaborators and recruiters. 🚀
                </p>
                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Every line of code you write deserves a place to shine — start building your presence now. 🌟
                </p>

              </div>


            </div>
          </div>
        </>
      )}

      <div className="mt-2 text-center">
        <button
          onClick={handleLogout}
          className="text-white bg-[#ff677d] px-4 py-2 rounded-lg hover:bg-[#ff4c63] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileData;
