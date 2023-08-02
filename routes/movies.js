const router = require('express').Router();

const {
  getMovies,
  postMovies,
  deleteMoviesById
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', postMovies);

router.delete('/movies/:id ', deleteMoviesById);

module.exports = router;