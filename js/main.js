'use strict';

// Показываем блок .map, убрав в JS-коде у него класс.
var showMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};
showMap();

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var pinMaxX = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;

// Создаём массив с типами предложений
var offers = ['palace', 'flat', 'house', 'bungalo'];

// Генерируем случайное число
var generateRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// Создаём массив, состоящий из 8 сгенерированных JS объектов
var generateAdvertisements = function () {
  var advertisements = [];
  for (var i = 0; i < NUMBER_OF_ADVERTISEMENTS; i++) {
    advertisements[i] = {
      author: {avatar: 'img/avatars/user0' + parseInt(i + 1, 10) + '.png'},
      offer: {type: generateRandomNumber(offers.length)},
      // Задаём расположение острого конца метки
      location: {x: generateRandomNumber(pinMaxX) + PIN_WIDTH / 2, y: PIN_MIN_Y + generateRandomNumber(PIN_MAX_Y - PIN_MIN_Y) + PIN_HEIGHT}
    };
  }
  return advertisements;
};

// Находим элемент в который будем вставлять новые элементы
var similarListElement = document.querySelector('.map__pins');

// Находим шаблон
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// Клонируем шаблон и заполняем данными пина
var renderPin = function (advertisement) {
  var pinElement = pinTemplate.cloneNode(true);
  // Задаём расположение левого верхнего угла метки
  pinElement.style = 'left: ' + (parseInt(advertisement.location.x, 10) - PIN_WIDTH / 2) + 'px; top: ' + (parseInt(advertisement.location.y, 10) - PIN_HEIGHT) + 'px';
  pinElement.children[0].src = advertisement.author.avatar;
  pinElement.children[0].alt = ' ';
  return pinElement;
};


// Заполнили массив данных объявлений. Складываем новые элементы в контейцнер
var addToFragment = function (advertisements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPin(advertisements[i]));
  }
  return fragment;
};

// Добавляем элементы из контейцнера на страницу
var NUMBER_OF_ADVERTISEMENTS = 8;

similarListElement.appendChild(addToFragment(generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));
