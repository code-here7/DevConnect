const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require('./DB/dbConnect.js');
dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,resp) => {
resp.send("Hit API");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile.js"));
app.use("/api/project", require("./routes/project.js"));


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});