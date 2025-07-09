const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { signup, login, getMe} = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
