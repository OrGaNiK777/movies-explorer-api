const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  patchUser, signOut
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

router.delete('/signout', signOut);

module.exports = router;