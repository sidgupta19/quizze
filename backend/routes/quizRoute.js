const express = require('express');
const {
  addQuiz,
  getQuiz,
  getUserQuizzes,
  attemptQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(protect, addQuiz)
  .get(protect, getUserQuizzes);

router
  .route('/:id')
  .get(getQuiz)
  .patch(attemptQuiz)
  .delete(protect, deleteQuiz);

module.exports = router;
