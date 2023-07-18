const Router = require('express').Router();
const {
  Joi, Segments, celebrate,
} = require('celebrate');

const auth = require('../middlewares/auth');
const movies = require('./movies');
const users = require('./users');
const { login, createNewUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');

// РЕГИСТРАЦИЯ
Router.post('/signup', celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  },
}), createNewUser);

// АВТОРИЗАЦИЯ
Router.post('/signin', celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  },
}), login);

// Защита роутов авторизацией
Router.use(auth);
Router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

Router.use('/users', users);
Router.use('/movies', movies);
Router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
module.exports = Router;
