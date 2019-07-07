'use strict';
// // Находим форму с фильтрами
var filters = document.querySelector('.map__filters');
// // Берем тип жилья
var housingType = filters.querySelector('.map__filter');

housingType.addEventListener('change', function () {
  window.map.removePins();
  window.map.addPins();
});

