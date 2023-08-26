const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'localhost:4000',
  'http://localhost:4000',
  "http://movies.exporer.diplom.nomoreparties.co",
  "http://api.movies.exporer.diplom.nomoreparties.co",
  "https://movies.exporer.diplom.nomoreparties.co",
  "https://api.movies.exporer.diplom.nomoreparties.co",
  "movies.exporer.diplom.nomoreparties.co",
  "api.movies.exporer.diplom.nomoreparties.co"

];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return true;
};
