const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const {
  createUser,
  login,
} = require('../controllers/authUsers');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).trim(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
}), login);

router.use(errors());

module.exports = router;
