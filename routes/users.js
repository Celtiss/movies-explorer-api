const Router = require('express').Router();
const updateUserValidation = require('../validation/users');

const {
  getUsers, getCurrentUser, updateUserInfo,
} = require('../controllers/users');

Router.get('/', getUsers);

// ПОЛУЧЕНИЕ ДАННЫХ ТЕКЦЩЕГО ПОЛЬЗОВАТЕЛЯ
Router.get('/me', getCurrentUser);

// ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
Router.patch('/me', updateUserValidation, updateUserInfo);
module.exports = Router;
