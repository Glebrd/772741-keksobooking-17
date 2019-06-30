'use strict';
(function () {
  // Задаём количество объявлений, размеры пина и ограничения по его расположению.
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var NUMBER_OF_ADVERTISEMENTS = 8;

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

  // Карта добавить пины

  var addPinsToMap = function () {
    similarListElement.appendChild(addToFragment(window.data.generateAdvertisements(NUMBER_OF_ADVERTISEMENTS)));
  };

  // Перетаскивание пина
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var mapPin = document.querySelector('.map__pin--main');
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        window.form.setAvailability(window.util.ENABLE);
        window.form.brighten();
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
      window.form.fillAdressField(parseInt(mapPin.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2), (parseInt(mapPin.style.top, 10) + MAIN_PIN_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        window.form.setAvailability(window.util.ENABLE);
        window.form.brighten();
        showMap();
        addPinsToMap();
        var currentCoordinatesX = mapPin.offsetLeft;
        var currentCoordinatesY = mapPin.offsetTop;
        window.form.fillAdressField(currentCoordinatesX + Math.floor(MAIN_PIN_WIDTH / 2), currentCoordinatesY + MAIN_PIN_HEIGHT);
      }
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
  });
})();
