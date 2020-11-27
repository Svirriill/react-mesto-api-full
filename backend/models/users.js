const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(value);
      },
      message: 'Введите правильный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введён некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return (Promise.reject(new BadRequestError({ message: 'Неправильные почта или пароль' })));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return (Promise.reject(new BadRequestError({ message: 'Неправильные почта или пароль' })));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
