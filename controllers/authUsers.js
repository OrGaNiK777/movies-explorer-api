const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const { SALT_ROUNDS } = require('../utils/consctants');

const ConflictError = require('../errors/conflict-error');
const NotAuthError = require('../errors/not-auth-error');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new NotAuthError('Пользователь не найден'));
      }
      return bcrypt.compare(password, user.password, (err, result) => {
        if (!result) { return next(new NotAuthError('Не верный email или пароль')); }
        const token = generateToken(user._id);
        res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
        res.status(httpConstants.HTTP_STATUS_OK).send(user);//
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(httpConstants.HTTP_STATUS_CREATED).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return next(new ConflictError(`Пользователь с Email ${req.body.email} уже существует`));
      }
      return next(err);
    });
};

module.exports = {
  login,
  createUser,
};
