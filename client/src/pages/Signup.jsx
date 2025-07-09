import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/auth/signup", {
      fullName,
      email,
      gender,
      password,
      location,
      contactNumber,
    });
    console.log(res);
    alert("Signup successful! ");
    navigate("/");
      } catch (err) {
    alert(err.response?.data?.msg || "Signup failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dcedc1] via-[#ffd3b5] to-[#ffaaa5] shadow-2xl border border-[#ffd3b5]">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-[#ff677d] mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Gender</label>
            <select
              className={`w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 ${gender === "" ? "text-gray-400" : "text-gray-800"
                }`}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[#ff677d] font-semibold mb-1">Contact Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#ff677d] text-white py-2 rounded-md font-bold hover:bg-[#ff4c63] transition duration-200"
            >
              Sign Up
            </button>
            <p className="text-center mt-4 text-sm text-gray-700">
              Already have an account? <a href="/" className="text-[#ff677d] underline">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
