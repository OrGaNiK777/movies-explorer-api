const httpConstants = require('http2').constants;

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const getUser = (req, res, next) => User.find({})
  .then((user) => res.status(httpConstants.HTTP_STATUS_OK)
    .send(user)).catch(next);

const patchUser = (req, res, next) => {
  const newUser = req.body;
  console.log(newUser)
  const { id } = req.user;
  return User.findByIdAndUpdate(id, newUser, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(`Пользователь по id  ${req.user._id} не найден`))
    .then((user) => res.status(httpConstants.HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(' and ')}`));
      }
      return next(err);
    });
};

const signOut = (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Вы вышли из системы' });
};

module.exports = {
  getUser,
  patchUser,
  signOut
};