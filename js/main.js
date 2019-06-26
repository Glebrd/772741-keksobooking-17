'use strict';

// Задаём количество объявлений, размеры пина и ограничения по его расположению.
var NUMBER_OF_ADVERTISEMENTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 84;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var ENABLE_ELEMENT = false;
var DISABLE_ELEMENT = true;

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
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {type: offerKeys[generateRandomNumber(offerKeys.length)]},
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


var map = document.querySelector('.map');

// Показываем блок .map, убрав в JS-коде у него класс.
var changeMapClass = function (mapIsDisabled) {
  if (mapIsDisabled) {
    map.classList.add('map--faded');
  } else if (!mapIsDisabled) { // Ветка при включении формы
    map.classList.remove('map--faded');
  }
};

var switchPins = function (mapIsDisabled) {
  if (mapIsDisabled) {
    var rederedPins = similarListElement.querySelectorAll('.map__pin');
    for (var i = 0; i < rederedPins.length; i++) {
      if (!rederedPins[i].classList.contains('map__pin--main')) {
        similarListElement.removeChild(rederedPins[i]);
      }
    }
  } else {
    similarListElement.appendChild(addToFragment(generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));
  }
};

var changeMapState = function (mapIsDisabled) {
  changeMapClass(mapIsDisabled);
  switchPins(mapIsDisabled);
};

// Вклюичение / Отключение формы формы
var form = document.querySelector('.ad-form');

// Включаем / Отключаем поля формы
var swithcFormFields = function (formIsDisabled) {
  var fieldsets = form.getElementsByTagName('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = formIsDisabled;
  }
};
// Добавляем / убираем форме класс disabled
var changeFormClass = function (formIsDisabled) {
  if (formIsDisabled) {
    form.classList.add('ad-form--disabled');
  } else if (!formIsDisabled) { // Ветка при включении формы
    form.classList.remove('ad-form--disabled');
  }
};

// Отключаем форму полностью
var changeFormState = function (formIsDisabled) {
  swithcFormFields(formIsDisabled);
  changeFormClass(formIsDisabled);
};

// Отключаем страницу
var changePageState = function (formIsDisabled) {
  changeFormState(formIsDisabled);
  changeMapState(formIsDisabled);
};

// Выключили форму при открытии страницы
changeFormState(DISABLE_ELEMENT);

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
  // movePin(startCoordinates, evt);

  var onMouseMove = function (moveEvt) {

    moveEvt.preventDefault();
    if (map.classList.contains('map--faded')) {
      changePageState(ENABLE_ELEMENT);
    }
    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    var currentCoordinatesX = mapPin.offsetLeft - (shift.x);
    var currentCoordinatesY = mapPin.offsetTop - (shift.y);

    if (currentCoordinatesX <= Math.ceil(mapWidth - MAIN_PIN_WIDTH / 2) &&
      currentCoordinatesX >= (-MAIN_PIN_WIDTH / 2) &&
      currentCoordinatesY <= PIN_MAX_Y &&
      currentCoordinatesY >= PIN_MIN_Y) {
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPin.style.top = currentCoordinatesY + 'px';
      mapPin.style.left = currentCoordinatesX + 'px';
      fillAdressField(currentCoordinatesX + Math.floor(MAIN_PIN_WIDTH / 2), currentCoordinatesY + MAIN_PIN_HEIGHT);
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (map.classList.contains('map--faded')) {
      changePageState(ENABLE_ELEMENT);
      var currentCoordinatesX = mapPin.offsetLeft;
      var currentCoordinatesY = mapPin.offsetTop;
      fillAdressField(currentCoordinatesX + Math.floor(MAIN_PIN_WIDTH / 2), currentCoordinatesY + MAIN_PIN_HEIGHT);
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', onMouseUp);
});
