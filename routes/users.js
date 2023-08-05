const router = require('express').Router();

const { patchUserValid } = require('../validations/validation');

const {
  getUser,
  patchUser,
  signOut,
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', patchUserValid, patchUser);

router.delete('/signout', signOut);

module.exports = router;
