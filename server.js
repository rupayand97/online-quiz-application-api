const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const quizRoutes = require("./routes/quiz.routes");

const app = express();
app.use(express.json());

connectToDB();

app.get("/test", (req, res) => {
  res.json({ msg: "This is Test Route." });
});

app.use("/quizzes", quizRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "This request is not found" });
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});