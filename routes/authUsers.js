const router = require('express').Router();
const { errors } = require('celebrate');

const { loginValid, createUserValid } = require('../validations/validation');
const { createUser, login } = require('../controllers/authUsers');

//создаёт пользователя с переданными в теле
//email, password и name
router.post('/signup', createUserValid, createUser);

//проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', loginValid, login);

router.use(errors());

module.exports = router;
