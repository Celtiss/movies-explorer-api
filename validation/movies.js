const { mongoose } = require('mongoose');
const {
  Joi, Segments, celebrate,
} = require('celebrate');
const { patternUrlImg, patternUrlLink } = require('../regex');
const { BadReqError } = require('../errors/BadReqError');

const createMovieValidation = celebrate({
  [Segments.BODY]: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(patternUrlImg),
    trailerLink: Joi.string().required().regex(patternUrlLink),
    thumbnail: Joi.string().required().regex(patternUrlImg),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
});

const deleteMovieValidation = celebrate({
  [Segments.PARAMS]: {
    _id: Joi.required().custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
});

module.exports = { createMovieValidation, deleteMovieValidation };
