require('dotenv').config();
const token = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  // верифицируем токен
  let payload;
  try {
    payload = token.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
