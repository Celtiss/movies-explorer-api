const Router = require('express').Router();
const {
  getSavedMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../validation/movies');

Router.get('/', getSavedMovies);
Router.post('/', createMovieValidation, createMovie);
Router.delete('/:_id', deleteMovieValidation, deleteMovie);
module.exports = Router;
