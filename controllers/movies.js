const httpConstants = require('http2').constants;

const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => Movie.find({})//.populate(['likes', 'owner'])
  .then((movies) => res.status(httpConstants.HTTP_STATUS_OK).send(movies))
  .catch(next);

const postMovies = (req, res, next) => {
  const { country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId} = req.body;
  const owner = req.user.id;
  Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner, })
    .then((newMovie) => res.status(httpConstants.HTTP_STATUS_CREATED).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(
          `${Object.values(err.errors).map((error) => error.message).join(', ')}`,
        ));
      }
      return next(err);
    });
};

const deleteMoviesById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(`Фильм с id ${req.params.id} не найдена`))
    .then((movie) => {
      if (movie.owner.toString() === req.user.id) {
        return movie.deleteOne()
          .then(res.status(httpConstants.HTTP_STATUS_OK).send({ message: 'Фильм удален' }));
      }
      return next(new ForbiddenError('Вы не можете удалять чужие карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для удаления карточки'));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  postMovies,
  deleteMoviesById,
};