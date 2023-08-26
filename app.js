const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const cors = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');
const { PORT, HOST } = require('./utils/consctants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const customErrorsHandler = require('./middlewares/customErrorsHandler');

const app = express();

mongoose
  .connect(`mongodb://${HOST}:27017/bitfilmsdb`, {
    useNewUrlParser: true,
    family: 4,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to DB');
  });

app.use(express.json());

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(cors);

app.use(cookieParser());

app.use(routes);

app.use(errorLogger);

app.use(customErrorsHandler);

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Cервер запущен на http://${HOST}:${PORT}/`);
});
