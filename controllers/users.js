// const { mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const { BadReqError } = require('../errors/BadReqError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;
const CREATED_CODE = 200;

// LOGIN
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      if (NODE_ENV === 'production') {
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          // secure: true,
          // sameSite: 'None',
        }).send({ message: 'Авторизация прошла успешно!' })
          .end();
      } else {
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        }).send({ message: 'Авторизация прошла успешно!' })
          .end();
      }
    })
    .catch(next);
};

module.exports.createNewUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, name, password: hash,
      })
        .then((user) => res.status(CREATED_CODE).send(user.toJSON()))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadReqError('Введены некорректные данные при создании нового пользователя'));
          } else if (err.code === 11000) {
            next(new ConflictError(`Пользователь с данным email уже существует: ${email}`));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// USERS
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// USERS/ME
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(`Пользователь с данным id не найден:  ${userId}`);
    })
    .then((user) => res.send(user))
    .catch(next);
};

// USERS/ME
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const dataUser = { email, name };
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, dataUser, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(`Пользователь с данным id не найден:  ${req.user._id}`);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Введены некорректные данные при обновлении пользователя'));
      } else if (err.code === 11000) {
        next(new ConflictError(`Пользователь с данным email уже существует: ${email}`));
      } else {
        next(err);
      }
    });
};
