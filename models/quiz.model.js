const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [optionSchema]
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema]
});

module.exports = mongoose.model("Quiz", quizSchema);
