const Quiz = require("../models/quiz.model");

const createQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const quiz = new Quiz({ title, questions: [] });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { text, options } = req.body;

    if (!text || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Invalid question format" });
    }

    if (!options.some((opt) => opt.isCorrect)) {
      return res
        .status(400)
        .json({ error: "At least one option must be correct" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    quiz.questions.push({ text, options });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getQuizQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const questions = quiz.questions.map((q) => ({
      _id: q._id,
      text: q.text,
      options: q.options.map((o) => ({ _id: o._id, text: o.text })),
    }));

    res.json({ title: quiz.title, questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    let score = 0;

    answers.forEach((ans) => {
      const question = quiz.questions.id(ans.questionId);
      if (question) {
        const option = question.options.id(ans.optionId);
        if (option && option.isCorrect) score++;
      }
    });

    res.json({ score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createQuiz, addQuestion, getQuizQuestions, submitQuiz };
