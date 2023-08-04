const router = require('express').Router();
const { errors } = require('celebrate');

const { loginValid, createUserValid } = require('../validations/validation');
const { createUser, login } = require('../controllers/authUsers');

router.post('/signup', createUserValid, createUser);

router.post('/signin', loginValid, login);

router.use(errors());

module.exports = router;
