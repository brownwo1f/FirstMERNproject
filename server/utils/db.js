const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin"; // uri of local database
const URI = process.env.MONGODB_URI;
// mongoose.connect(URI);

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful to database!");
  } catch (error) {
    error = {
      message: "Database connection failed",
    };
    next(error);
    //console.log("Database connection failed");
    process.exit(0);
  }
};

module.exports = connectDB;
