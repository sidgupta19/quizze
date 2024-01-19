const mongoose = require('mongoose');
const validator = require('validator');

const answerSchema = new mongoose.Schema({
  option: {
    type: String
  },
  imageOption: {
    type: String,
    validate: [validator.isURL, 'Enter a valid URL']
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'textAndImage']
  },
  options: {
    type: [answerSchema],
    validate: {
      validator: function(options) {
        return options.length > 1 && options.length <= 4;
      },
      message: 'Minimum two option required. Max is four.'
    },
    required: true
  },
  answer: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value < this.options.length;
      },
      message: 'Answer index is out of range'
    }
  }
});

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    default: 'Q&A'
  },
  name: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    validate: {
      validator: function(value) {
        return value.length > 0 && value.length <= 5;
      },
      message: 'Minimum one question required. Max is five'
    },
    required: true
  },
  timer: {
    type: Number,
    default: null
  }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
