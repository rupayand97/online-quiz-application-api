const express = require("express");
const {
  createQuiz,
  addQuestion,
  getQuizQuestions,
  submitQuiz,
} = require("../controllers/quiz.controller");

const router = express.Router();

router.post("/", createQuiz);
router.post("/:quizId/questions", addQuestion);
router.get("/:quizId/questions", getQuizQuestions);
router.post("/:quizId/submit", submitQuiz);

module.exports = router;
