const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

const connectDatabase = async () => {
  try {
    console.log("Establishing database connection...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 120000,
    });

    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error: ", error);
    setTimeout(connectDatabase, 5000);
  }
};

module.exports = connectDatabase;
