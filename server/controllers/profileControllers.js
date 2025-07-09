const Profile = require("../models/Profile");
const User = require("../models/User"); 

// POST /api/profile/createProfile
const createProfile = async (req, res) => {
  try {
    const {
      userId,
      headline,
      role,
      profilepic,
      bio,
      skills,
      github,
      linkedin,
      website,
      username,
      gender,
    } = req.body;

    // Check if profile already exists for this user
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ success: false, msg: "Profile already exists" });
    }

    // Generate default profile picture if not provided
    let finalProfilePic = profilepic;

    if (!profilepic && username && gender) {
      if (gender.toLowerCase() === "male") {
        finalProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      } else if (gender.toLowerCase() === "female") {
        finalProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
      }
    }

    // Create profile
    const profile = await Profile.create({
      user: userId,
      headline,
      role,
      profilepic: finalProfilePic,
      bio,
      skills,
      github,
      linkedin,
      website,
    });

    res.status(201).json({ success: true, msg: "Profile created", profile });
  } catch (e) {
    console.error("Create Profile Error:", e);
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};

// POST /api/profile/getProfile
const getProfile = async (req, res) => {
  try {
    const userId = req.params.id; // 👈 from URL param

    const profile = await Profile.findOne({ user: userId }).populate("user", "-password");
    if (!profile) {
      return res.status(200).json({ success: true, profile: null });
    }

    res.status(200).json({ success: true, profile });
  } catch (e) {
    console.error("Get Profile Error:", e);
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};


// GET /api/profile/getAllProfiles
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "-password");
    res.status(200).json({ success: true, count: profiles.length, profiles });
  } catch (e) {
    console.error("Get All Profiles Error:", e);
    res.status(500).json({ success: false, msg: "Server error", error: e.message });
  }
};


module.exports = { createProfile, getProfile, getAllProfiles };
