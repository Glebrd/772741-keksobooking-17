'use strict';

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var NUMBER_OF_ADVERTISEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 84;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var ENABLE_FORM = false;
var DISABLE_FORM = true;

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
  window.pinMaxX = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;
  var advertisements = [];
  var offerKeys = Object.keys(offers);
  for (var i = 0; i < numberOfAdvertisements; i++) {
    advertisements[i] = {
      author: { avatar: 'img/avatars/user0' + (i + 1) + '.png' },
      offer: { type: offerKeys[generateRandomNumber(offerKeys.length)] },
      // Задаём расположение острого конца метки
      location: { x: generateRandomNumber(window.pinMaxX) + PIN_WIDTH / 2, y: PIN_MIN_Y + generateRandomNumber(PIN_MAX_Y - PIN_MIN_Y) + PIN_HEIGHT }
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

// Показываем блок .map, убрав в JS-коде у него класс.
var map = document.querySelector('.map');
var showMap = function () {
  map.classList.remove('map--faded');
  // Добавляем элементы из контейцнера на страницу
  similarListElement.appendChild(addToFragment(generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));
};

// Вклюичение / Отключае формы
var mapPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var changeFormState = function (formIsDisabled) {
  var fieldsets = form.getElementsByTagName('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = formIsDisabled;
  }
  // Ветка при отключении формы
  if (!form.classList.contains('ad-form--disabled')) {
    form.classList.add('ad-form--disabled');
  } else if (!formIsDisabled) { // Ветка при включении формы
    form.classList.remove('ad-form--disabled');
  }
};

// Отключение формы
changeFormState(DISABLE_FORM);

// Заполние поля Адрес
var mainPinY = mapPin.offsetTop;
var mainPinX = mapPin.offsetLeft;
var address = document.getElementById('address');

var fillAdressField = function (X, Y) {
  address.value = X + ', ' + Y;
};

fillAdressField(mainPinX, mainPinY);

// Делаем страницу
var enablePage = function () {
  changeFormState(ENABLE_FORM);
  showMap();
  mapPin.removeEventListener('mouseup', enablePage);
  fillAdressField(mainPinX + MAIN_PIN_WIDTH / 2, mainPinY + MAIN_PIN_HEIGHT);
};

mapPin.addEventListener('mouseup', enablePage);


// Валидация полейц "Тип жилья" и "Цена за ночь"
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
var addressX = null;
var addressY = null;
mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordinates = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPin.offsetLeft - shift.x) >= (mapWidth - MAIN_PIN_WIDTH / 2)) {
      addressX = mapWidth - MAIN_PIN_WIDTH / 2;
      mapPin.style.left = addressX + 'px';
    }
    else if ((mapPin.offsetLeft - shift.x) <= (-MAIN_PIN_WIDTH / 2)) {
      addressX = -MAIN_PIN_WIDTH / 2;
      mapPin.style.left = addressX + 'px';
    }
    else {
      addressX = mapPin.offsetLeft - shift.x;
      mapPin.style.left = addressX + 'px';
    }
    if ((mapPin.offsetTop - shift.y) >= PIN_MAX_Y) {
      addressY = PIN_MAX_Y;
      mapPin.style.top = addressY + 'px';
    }
    else if ((mapPin.offsetTop - shift.y) <= PIN_MIN_Y) {
      addressY = PIN_MIN_Y;
      mapPin.style.top = addressY + 'px';
    }
    else {
      addressY = mapPin.offsetTop - shift.y;
      mapPin.style.top = addressY + 'px';
    }

    fillAdressField(addressX + MAIN_PIN_WIDTH / 2, addressY + PIN_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
