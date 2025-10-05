const express = require("express");
const connectToDB = require("./configs/mongodb.config");
const quizRoutes = require("./routes/quiz.routes");

const app = express();
app.use(express.json());

connectToDB();

app.use("/api/quizzes", quizRoutes);

app.listen(3000, () => console.log(`Server running on port 3000`));