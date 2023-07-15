const Router = require('express').Router();
const {
  Joi, Segments, celebrate,
} = require('celebrate');

const {
  getUsers, getCurrentUser, updateUserInfo,
} = require('../controllers/users');

Router.get('/', getUsers);

// ПОЛУЧЕНИЕ ДАННЫХ ТЕКЦЩЕГО ПОЛЬЗОВАТЕЛЯ
Router.get('/me', getCurrentUser);

// ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
Router.patch('/me', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  },
}), updateUserInfo);
module.exports = Router;
