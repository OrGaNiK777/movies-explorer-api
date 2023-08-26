const router = require('express').Router();

const { patchUserValid } = require('../validations/validation');

const {
  getUser,
  patchUser,
  signOut,
} = require('../controllers/users');

//возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUser);

//обновляет информацию о пользователе (email и имя)
router.patch('/users/me', patchUserValid, patchUser);

//выход с сайта
router.delete('/signout', signOut);

module.exports = router;
