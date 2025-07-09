const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { getProfile, createProfile, getAllProfiles} = require("../controllers/profileControllers");


router.post("/createProfile", createProfile);
router.get("/getProfile/:id", getProfile);
router.get("/getAllProfiles", getAllProfiles);

module.exports = router;