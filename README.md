# Quiz API – Express + MongoDB

It is a **Quiz Management REST API** built using **Node.js**, **Express**, and **MongoDB**.  
The API allows creating quizzes, adding questions, fetching quiz questions without answers, and submitting answers to calculate scores.

---

## Features

- Create quizzes with titles  
- Add multiple questions and options with one correct answer  
- Retrieve all questions for a quiz, and the answers are hidden
- Submit answers and calculate scores 
- MongoDB integration using Mongoose

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **ODM:** Mongoose  

---

## Setup Instructions
### 1️. Clone the Repository
```bash
git clone https://github.com/rupayand97/online-quiz-application-api.git
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Configure MongoDB
Run MongoDB locally. By default, the app connects to:
```bash
mongodb://127.0.0.1:27017/quizapi
```

This can be modified inside:
```bash
configs/mongodb.config.js
```

### 4. Start the Server
```bash
nodemon server.js
```

If successful, the following message will be displayed on the console:

Connected To DB  
Server running on port 3000


## API Endpoints
1. Create a Quiz

POST */api/quizzes*

*Request Body:*
```bash
{
  "title": "Geography"
}
````
2. Add Question to a Quiz

POST */api/quizzes/:quizId/questions*

Request Body:
```bash
{
  "text": "who shares a border with Ukraine?",
  "options": [
    { "text": "Poland", "isCorrect": true },
    { "text": "Germany", "isCorrect": false },
    { "text": "France", "isCorrect": false }
  ]
}
```
3. Get Quiz Questions - Without Answers

GET */api/quizzes/:quizId/questions*


4. Submit Quiz Answers

POST */api/quizzes/:quizId/submit*

Request Body:
```bash
{
  "answers": [
    { "questionId": "652a...", "optionId": "652b..." },
    { "questionId": "652e...", "optionId": "652f..." }
  ]
}
```

Sample Response:
```bash
{
  "score": 2,
  "total": 5
}
```
