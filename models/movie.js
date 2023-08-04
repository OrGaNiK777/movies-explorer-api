const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
  country: { type: String, required: true }, // — страна создания фильма. Обязательное поле-строка.
  director: { type: String, required: true }, // — режиссёр фильма. Обязательное поле-строка.
  duration: { type: Number, required: true }, // — длительность фильма. Обязательное поле-число.
  year: { type: String, required: true }, // — год выпуска фильма. Обязательное поле-строка.
  description: { type: String, required: true }, // — описание фильма. Обязательное поле-строка.
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return /^(http:|https:)\/\/w*\w/.test(image);
      },
      message: 'Ссылка некорректна',
    },
  }, // — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(trailerLink) {
        return /^(http:|https:)\/\/w*\w/.test(trailerLink);
      },
      message: 'Ссылка некорректна',
    },
  }, // — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(thumbnail) {
        return /^(http:|https:)\/\/w*\w/.test(thumbnail);
      },
      message: 'Ссылка некорректна',
    },
  // eslint-disable-next-line max-len
  }, // — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }, // — _id пользователя, который сохранил фильм. Обязательное поле.
  movieId: {
    type: Number,
    required: true,
  // eslint-disable-next-line max-len
  }, // — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле в формате number.
  nameRU: {
    type: String,
    required: true,
  }, // — название фильма на русском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  }, // — название фильма на русском языке. Обязательное поле-строка.
});

module.exports = mongoose.model('movie', moviesSchema);
