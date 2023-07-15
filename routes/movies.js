const Router = require('express').Router();
const { mongoose } = require('mongoose');
const {
  Joi, Segments, celebrate,
} = require('celebrate');
const {
  getSavedMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const { patternUrlImg, patternUrlLink } = require('../regex');
const { BadReqError } = require('../errors/BadReqError');

Router.get('/', getSavedMovies);
Router.post('/', celebrate({
  [Segments.BODY]: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(patternUrlImg),
    trailerLink: Joi.string().required().regex(patternUrlLink),
    thumbNail: Joi.string().required().regex(patternUrlLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
}), createMovie);
Router.delete('/:_id', celebrate({
  [Segments.PARAMS]: {
    _id: Joi.required().custom((v) => {
      if (!mongoose.isValidObjectId(v)) {
        throw new BadReqError('Invalid ID');
      }
      return v;
    }),
  },
}), deleteMovie);
module.exports = Router;
