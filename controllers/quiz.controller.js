const Quiz = require("../models/quiz.model");

exports.createQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const quiz = new Quiz({ title });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const { text, options } = req.body;

    if (!text || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "Invalid question format" });
    }

    if (!options.some(opt => opt.isCorrect)) {
      return res.status(400).json({ error: "At least one option must be correct" });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    quiz.questions.push({ text, options });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or data" });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};
