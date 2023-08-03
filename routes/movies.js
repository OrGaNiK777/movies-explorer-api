const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  postMovies,
  deleteMoviesById
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', postMovies);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteMoviesById);

module.exports = router;