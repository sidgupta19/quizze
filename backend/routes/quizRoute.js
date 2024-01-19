const express = require('express');
const { addQuiz } = require('../controllers/quizController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, addQuiz);

module.exports = router;
