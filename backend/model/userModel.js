const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(val) {
        return this.password === val;
      },
      message: 'Password do no match'
    }
  }
});

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.method('comparePassword', async function(provided, stored) {
  return await bcrypt.compare(provided, stored);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
