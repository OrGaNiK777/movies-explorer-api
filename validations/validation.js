const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// ----------------auth
const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).trim(),
    name: Joi.string().min(2).max(30),
  }),
});

// ----------------movies
const postMoviesValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
    trailerLink: Joi.string().required().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(
      (value) => {
        if (validator.isURL(value)) {
          return value;
        }
        throw new Error('Ссылка некорректна');
      },
    ),
    movieId: Joi.number().required(),
  }),
});

// ----------------users
const deleteMoviesByIdValid = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const patchUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  loginValid, createUserValid, postMoviesValid, deleteMoviesByIdValid, patchUserValid,
};
