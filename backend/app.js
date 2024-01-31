const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const quizRouter = require('./routes/quizRoute');
const pollRouter = require('./routes/pollRoute');
const userRouter = require('./routes/userRoute');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Welcome to the quizze server! 🚀');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/quizzes', quizRouter);
app.use('/api/v1/polls', pollRouter);
app.use('/api/v1/users', userRouter);

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use(globalErrorHandler);

module.exports = app;
