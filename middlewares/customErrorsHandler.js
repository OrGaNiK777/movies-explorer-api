const httpConstants = require('http2').constants;

module.exports = (error, req, res, next) => {
  const { statusCode = httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode)
    .send({ message: statusCode === httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Произошла ошибка сервера' : message });
  // eslint-disable-next-line no-console
  console.log(statusCode);
  return next();
};
