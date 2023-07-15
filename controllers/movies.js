const Movie = require('../models/movie');
const { ForbiddenError } = require('../errors/ForbiddenError');

module.exports.getSavedMovies = (req, res, next) => {
  const userId = req.user._id;
  Movie.find({})
    .then((movies) => {
      const userMovies = movies.filter((movie) => String(movie.owner) === userId);
      res.send(userMovies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbNail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbNail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;
  Movie.findById(_id)
    .then((movie) => {
      if (String(movie.owner) === userId) {
        Movie.findByIdAndDelete(_id)
          .then(() => res.send({ message: 'Фильм успешно удален' }))
          .catch(next);
      } else {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
    })
    .catch(next);
  return 0;
};
