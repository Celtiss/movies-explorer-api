const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { emailRegex } = require('../regex');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return emailRegex.test(v);
      },
      message: 'Invalid email.',
    },
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.password;
  return data;
};

const user = mongoose.model('user', userSchema);
user.createIndexes();
module.exports = user;
