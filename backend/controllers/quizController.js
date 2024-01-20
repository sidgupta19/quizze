const Quiz = require('../model/quizModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addQuiz = catchAsync(async (req, res, next) => {
  const { name, questions, timer } = req.body;

  const quiz = await Quiz.create({
    name,
    questions,
    timer,
    createdBy: req.user.id
  });

  res.status(200).json({
    status: 'success',
    data: { quiz }
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id);

  if (!quiz) {
    return next(new AppError('Quiz does not exist', 404));
  }

  quiz.impressions += 1;
  await quiz.save();

  res.status(200).json({
    status: 'success',
    data: { quiz }
  });
});

exports.getUserQuizzes = catchAsync(async (req, res, next) => {
  const quizes = await Quiz.find({ createdBy: req.user.id });

  res.status(200).json({
    status: 'success',
    results: quizes.length,
    data: { quizes }
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const { results } = req.body;
  const { id } = req.params;

  const quiz = await Quiz.findById(id);

  if (!quiz) {
    return next(new AppError('Could not find quiz', 404));
  }

  results.forEach(el => {
    if (el.isAttempted) {
      // eslint-disable-next-line eqeqeq
      const question = quiz.questions.find(q => q._id == el.id);

      if (!question) {
        return next(new AppError('Question is not present', 400));
      }

      question.attempts += 1;
      if (el.isCorrect) {
        question.corrects += 1;
      }
    }
  });

  await quiz.save();

  res.status(200).json({
    status: 'success',
    date: { quiz }
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findByIdAndDelete(id);

  if (!quiz) {
    return next(new AppError('No quiz found with this id', 404));
  }

  res.status(204).json({
    status: 'success'
  });
});
