const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
try 
{
   console.log("Connecting to:", process.env.MONGO_URI); 
   await mongoose.connect(process.env.MONGO_URI);
}
catch(e)
{
console.log("Error Occured: "+e);
}
}

module.exports = dbConnect;