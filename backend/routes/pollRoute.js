const express = require('express');
const {
  getPoll,
  addPoll,
  getUsersPolls,
  updatePoll
} = require('../controllers/pollController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(protect, addPoll)
  .get(protect, getUsersPolls);

router
  .route('/:id')
  .get(getPoll)
  .patch(updatePoll);

module.exports = router;
