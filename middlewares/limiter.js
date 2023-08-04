const rateLimit = require('express-rate-limit');

const consctants = require('../utils/consctants');

const {
  LIMITER_WINDOW = consctants.LIMITER_WINDOW,
  LIMITER_MAX_LIMIT = consctants.LIMITER_MAX_LIMIT,
} = process.env;

const limiter = rateLimit({
  windowMs: LIMITER_WINDOW,
  max: LIMITER_MAX_LIMIT,
});

module.exports = { limiter };
