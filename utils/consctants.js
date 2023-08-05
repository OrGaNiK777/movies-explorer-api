const { HOST = 'localhost' } = process.env;

const { PORT = 3000 } = process.env;

const SALT_ROUNDS = 10;

const LIMITER_WINDOW = 60000;

const LIMITER_MAX_LIMIT = 100;

module.exports = {
  HOST, PORT, SALT_ROUNDS, LIMITER_WINDOW, LIMITER_MAX_LIMIT,
};
