const {
  Joi, Segments, celebrate,
} = require('celebrate');

const updateUserValidation = celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  },
});

module.exports = updateUserValidation;
