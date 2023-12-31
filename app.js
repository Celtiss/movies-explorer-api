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
const errorHandler = require('./middlewares/errorHandler');

const { NODE_ENV, PORT = 3000, DB_PATH } = process.env;

const app = express();

// Подключение к БД
mongoose.connect(NODE_ENV === 'production' ? DB_PATH : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
})
  .then(() => console.log('connected'))
  .catch((err) => console.log(`Ошибка подключения базы данных: ${err}`));

// Обработка CORS
app.use(cors({
  origin: [
    'http://movies.tmr.nomoreparties.co',
    'https://movies.tmr.nomoreparties.co',
    'http://localhost:3000',
    'https://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3001'],
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
app.use(routes);
app.use(errorLogger); // логгер ошибок

// // ОБРАБОТКА ОШИБОК
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
