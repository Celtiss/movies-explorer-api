const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  errors,
} = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_PATH } = process.env;

const app = express();

// Подключение к БД
mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка подключения базы данных: ${err}`));

// Обработка CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
  ],
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());
app.use(requestLogger); // логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', routes);
app.use(errorLogger); // логгер ошибок

// // ОБРАБОТКА ОШИБОК
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});