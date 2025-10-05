const express = require("express");
const { createQuiz, addQuestion, getQuiz } = require("../controllers/quiz.controller");

const router = express.Router();

router.post("/", createQuiz);
router.post("/:id/questions", addQuestion);
router.get("/:id", getQuiz);

module.exports = router;
