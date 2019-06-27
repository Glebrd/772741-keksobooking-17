'use strict';

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var NUMBER_OF_ADVERTISEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 84;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;

var offers = {
  palace: 10000,
  flat: 5000,
  house: 1000,
  bungalo: 0
};

// Генерируем случайное число
var generateRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// Создаём массив, состоящий из 8 сгенерированных JS объектов
var generateAdvertisements = function (numberOfAdvertisements) {
  var pinMaxX = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;
  var advertisements = [];
  var offerKeys = Object.keys(offers);
  for (var i = 0; i < numberOfAdvertisements; i++) {
    advertisements[i] = {
      author: { avatar: 'img/avatars/user0' + (i + 1) + '.png' },
      offer: { type: offerKeys[generateRandomNumber(offerKeys.length)] },
      // Задаём расположение острого конца метки
      location: { x: generateRandomNumber(pinMaxX) + PIN_WIDTH / 2, y: PIN_MIN_Y + generateRandomNumber(PIN_MAX_Y - PIN_MIN_Y) + PIN_HEIGHT }
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

// --Карта тоггл
var map = document.querySelector('.map');

// Карта тоггл класса map--faded
var showMap = function () {
  map.classList.remove('map--faded');
};

// Карта добавить / убрать пины

var addPinsToMap = function () {
  similarListElement.appendChild(addToFragment(generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));
};

// Отключение формы
var form = document.querySelector('.ad-form');
var activateForm = function () {
  // Отключаем поля
  var fieldsets = form.getElementsByTagName('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = false;
  }
  // Убираем класс
  form.classList.remove('ad-form--disabled');
};

// Включение формы
var deactivateForm = function () {
  // Включаем поля
  var fieldsets = form.getElementsByTagName('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }
  // Добавляем класс
  form.classList.add('ad-form--disabled');
};


// Выключили форму при открытии страницы
deactivateForm();

// Заполние поля Адрес
var mapPin = document.querySelector('.map__pin--main');
var mainPinY = mapPin.offsetTop;
var mainPinX = mapPin.offsetLeft;
var address = document.getElementById('address');

var fillAdressField = function (X, Y) {
  address.value = X + ', ' + Y;
};

fillAdressField(mainPinX, mainPinY);

// Валидация полей "Тип жилья" и "Цена за ночь"
var housingTypeSelect = document.querySelector('#type');
var housingPriceInput = document.querySelector('#price');

var housingTypeInputFill = function () {
  housingPriceInput.min = offers[housingTypeSelect.value];
  housingPriceInput.placeholder = offers[housingTypeSelect.value];
};

housingTypeSelect.addEventListener('change', housingTypeInputFill);

// Валидация полей Время заезда и выезда
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

var onTimeInSelect = function () {
  timeOutSelect.value = timeInSelect.value;
};

var onTimeOutSelect = function () {
  timeInSelect.value = timeOutSelect.value;
};

timeInSelect.addEventListener('change', onTimeInSelect);
timeOutSelect.addEventListener('change', onTimeOutSelect);

// Перетаскивание пина
var mapWidth = document.querySelector('.map__pins').offsetWidth;

mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {

    moveEvt.preventDefault();
    if (map.classList.contains('map--faded')) {
      activateForm();
      showMap();
      addPinsToMap();
    }
    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    var currentCoordinatesX = mapPin.offsetLeft - (shift.x);
    var currentCoordinatesY = mapPin.offsetTop - (shift.y);
    if (currentCoordinatesX <= Math.round(mapWidth - MAIN_PIN_WIDTH / 2)) {
      if (currentCoordinatesX >= (-MAIN_PIN_WIDTH / 2)) {
        startCoordinates.x = moveEvt.clientX;
        mapPin.style.left = currentCoordinatesX + 'px';
      }
    }
    if (currentCoordinatesY <= PIN_MAX_Y) {
      if (currentCoordinatesY >= PIN_MIN_Y) {
        startCoordinates.y = moveEvt.clientY;
        mapPin.style.top = currentCoordinatesY + 'px';
      }
    }
    fillAdressField(parseInt(mapPin.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2), (parseInt(mapPin.style.top, 10) + MAIN_PIN_HEIGHT));
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (map.classList.contains('map--faded')) {
      activateForm();
      showMap();
      addPinsToMap();
      var currentCoordinatesX = mapPin.offsetLeft;
      var currentCoordinatesY = mapPin.offsetTop;
      fillAdressField(currentCoordinatesX + Math.floor(MAIN_PIN_WIDTH / 2), currentCoordinatesY + MAIN_PIN_HEIGHT);
    }
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  window.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', onMouseUp);
});
