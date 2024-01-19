const express = require('express');
const authRouter = require('./routes/authRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.get('/api/v1/', (req, res) => {
  res.status(200);
  res.send('Welcome to the quizze server! 🚀');
});

app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use(globalErrorHandler);

module.exports = app;
