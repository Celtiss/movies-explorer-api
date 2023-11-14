# movies-explorer-api
## Api для сервиса по поиску фильмов/API for the movie search service.
Адрес сервера: https://api.movies-tmr.nomoredomains.xyz

## About

Сервер для сервиса по поиску фильмов. Он позволяет: 
- регистрировать и авторизовывать пользователей; 
- передавать токен через cookie; 
- предоставляет доступ к схемам пользователей и их сохраненным фильмам в БД.

A server for the movie search service. It allows you to:
- register and authenticate users;
- pass tokens via cookies;
- provide access to user schemas and their saved movies in the database.

## Tech

- JavaScript
- Express.js
- MongoDB
- NodeJS
- npm
- Webpack

## Test

Вы можете проверить работоспособность запросов к серверу с помощью Postman.
Вот пример некоторых запросов на адрес https://api.movies-tmr.nomoredomains.xyz

You can check the functionality of server requests using Postman. Here are some example requests to the address https://api.movies-tmr.nomoredomains.xyz.

### GET:
/users/ - получить всех пользователей
/users/me - получить авторизованного пользователя
/movies/ - получить все фильмы

### POST:
/signup - регистрация
``` json
{
  "email": "example@gmail.com",
  "password": "qwerty",
  "name": "Cat"
}
```

/signin - авторизация
``` json
{
  "email": "example@gmail.com",
  "password": "qwerty"
}
```

/movies/ - добавление новых фильмов в бд

``` json
{
    "country": "France",
    "director": "Jhon",
    "duration": 120,
    "year": "1998",
    "description": "text",
    "image": "[image url]",
    "trailerLink": "[url]",
    "thumbnail": "[url]",
    "movieId": 1,
    "nameRU": "Кот",
    "nameEN": "Cat",
  }
```

### PATCH: 
/users/me - изменение данных профиля
``` json
{
  "email": "example@gmail.com",
  "name": "dog"
}
```

### DELETE:
/movies/:_id - удалить фильм по id


