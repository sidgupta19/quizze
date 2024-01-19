const Quiz = require('../model/quizModel');
const catchAsync = require('../utils/catchAsync');

exports.addQuiz = catchAsync(async (req, res, next) => {
  const { name, questions } = req.body;

  const quiz = new Quiz({ name, questions });

  await quiz.save();

  res.status(200).json({
    status: 'success',
    data: { quiz }
  });
});
