const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

require("dotenv").config(); 

const JWT_SECRET = process.env.JWT_SECRET;

// Signup Controller
exports.signup = async (req, res) => {
  const { fullName, email, gender, password,location, contactNumber } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      gender,
      password: hashed,
      location,
      contactNumber
    });

    res.status(201).json({ message: "User created successfully", userId: user._id });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};


// Get Current User Controller
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.sendStatus(401);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};