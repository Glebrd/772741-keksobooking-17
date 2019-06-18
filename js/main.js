'use strict';

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var NUMBER_OF_ADVERTISEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var ENABLE_FORM = false;
var DISABLE_FORM = true;

var OFFERS = [
  {
    housingtype: 'palace',
    minprice: 10000,
  },
  {
    housingtype: 'flat',
    minprice: 5000,
  },
  {
    housingtype: 'house',
    minprice: 1000,
  },
  {
    housingtype: 'bungalo',
    minprice: 0,
  }
];


// Создаём массив с типами предложений
// var OFFERS = ['palace', 'flat', 'house', 'bungalo'];

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
      offer: {type: OFFERS[generateRandomNumber(OFFERS.length)].housingtype},
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
  for (var i = 0; i < OFFERS.length; i++) {
    if (OFFERS[i].housingtype === housingTypeSelect.value) {
      housingPriceInput.placeholder = OFFERS[i].minprice;
      housingPriceInput.min = OFFERS[i].minprice;
    }
  }
};

housingTypeSelect.addEventListener('change', housingTypeInputFill);

// Валидация полейц Время заезда и выезда

var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

var getTimeInOut = function (evt) {
  if (evt.target === timeInSelect) {
    timeOutSelect.value = timeInSelect.value;
  } else {
    timeInSelect.value = timeOutSelect.value;
  }
};

timeInSelect.addEventListener('change', getTimeInOut);
timeOutSelect.addEventListener('change', getTimeInOut);
