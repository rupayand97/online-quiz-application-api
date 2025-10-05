const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/quiz");
    console.log("Connected To DB");
  } catch (error) {
    console.log("Error in Connecting DB");
    console.log(error);
  }
};

module.exports = connectToDB;
