const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT, host } = require('./utils/consctants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const customErrorsHandler = require('./middlewares/customErrorsHandler');

const app = express();

mongoose
  .connect(`mongodb://${host}:27017/filmsdb`, {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to DB');
  });

app.use(express.json());

app.use(requestLogger);

app.use(cookieParser());

app.use(routes);

app.use(errorLogger);

app.use(customErrorsHandler);

app.listen(PORT, host, () => {
  console.log(`Cервер запущен на http://${host}:${PORT}/`);
});