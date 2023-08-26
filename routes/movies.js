const router = require('express').Router();

const { postMoviesValid, deleteMoviesByIdValid } = require('../validations/validation');

const {
  getMovieCurrentUser,
  postMovies,
  deleteMoviesById,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/movies', getMovieCurrentUser);

//создаёт фильм с переданными в теле
//country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/movies', postMoviesValid, postMovies);

//удаляет сохранённый фильм по id
router.delete('/movies/:id', deleteMoviesByIdValid, deleteMoviesById);

module.exports = router;
