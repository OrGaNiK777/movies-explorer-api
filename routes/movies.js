const router = require('express').Router();

const { postMoviesValid, deleteMoviesByIdValid } = require('../validations/validation');

const {
  getMovieCurrentUser,
  postMovies,
  deleteMoviesById,
} = require('../controllers/movies');

router.get('/movies', getMovieCurrentUser);

router.post('/movies', postMoviesValid, postMovies);

router.delete('/movies/:id', deleteMoviesByIdValid, deleteMoviesById);

module.exports = router;
