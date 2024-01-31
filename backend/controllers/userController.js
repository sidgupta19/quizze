const catchAsync = require('../utils/catchAsync');
const Quiz = require('../model/quizModel');
const Poll = require('../model/pollModel');

exports.getTrendings = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ createdBy: req.user.id });
  const polls = await Poll.find({ createdBy: req.user.id });

  const docs = [...quizzes, ...polls];

  docs.sort((a, b) => b.impressions - a.impressions);

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: { docs }
  });
});

exports.getStats = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ createdBy: req.user.id });
  const polls = await Poll.find({ createdBy: req.user.id });

  const stats = {};
  stats.totalQuizzesAndPolls = quizzes.length + polls.length;

  let totalQuizzesQuestions = 0;
  let totalPollsQuestions = 0;

  quizzes.forEach(quiz => {
    totalQuizzesQuestions += quiz.questions.length;
  });

  polls.forEach(poll => {
    totalPollsQuestions += poll.questions.length;
  });

  stats.totalQuestions = totalPollsQuestions + totalQuizzesQuestions;

  let totalPollImpressions = 0;
  let totlaQuizImpressions = 0;

  quizzes.forEach(quiz => {
    totlaQuizImpressions += quiz.impressions;
  });

  polls.forEach(poll => {
    totalPollImpressions += poll.impressions;
  });

  stats.totalImpressions = totalPollImpressions + totlaQuizImpressions;

  res.status(200).json({
    status: 'success',
    data: { stats }
  });
});

exports.getUsersPollsAndQuizzes = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ createdBy: req.user.id });
  const polls = await Poll.find({ createdBy: req.user.id });

  const docs = [...quizzes, ...polls].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  res.status(200).json({
    status: 'success',
    results: docs.length,
    data: { docs }
  });
});
