'use strict';

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var NUMBER_OF_ADVERTISEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;

// Создаём массив с типами предложений
var OFFERS = ['palace', 'flat', 'house', 'bungalo'];

// Показываем блок .map, убрав в JS-коде у него класс.
var map = document.querySelector('.map');
var showMap = function () {
  map.classList.remove('map--faded');
};
// showMap();

// Генерируем случайное число
var generateRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// Создаём массив, состоящий из 8 сгенерированных JS объектов
var generateAdvertisements = function (numberOfAdvertisements) {
  var pinMaxX = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;
  var advertisements = [];
  for (var i = 0; i < numberOfAdvertisements; i++) {
    advertisements[i] = {
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {type: generateRandomNumber(OFFERS.length)},
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
  pinElement.style = 'left: ' + (advertisement.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisement.location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = advertisement.author.avatar;
  pinElement.querySelector('img').alt = ' ';
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
similarListElement.appendChild(addToFragment(generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));

// Отключаем форму форму
var form = document.querySelector('.ad-form');
var fieldsets = form.getElementsByTagName('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].disabled = true;
}
