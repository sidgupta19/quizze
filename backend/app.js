const express = require('express');
const authRouter = require('./routes/authRoute');
const quizRouter = require('./routes/quizRoute');
const pollRouter = require('./routes/pollRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.get('/api/v1/', (req, res) => {
  res.status(200);
  res.send('Welcome to the quizze server! 🚀');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/polls', pollRouter);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use(globalErrorHandler);

module.exports = app;
