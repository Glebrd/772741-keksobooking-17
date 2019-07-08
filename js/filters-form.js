'use strict';

document.querySelector('.map__filters').addEventListener('change', function () {
  window.map.removePins();
  window.map.addPins();
  window.card1.fill();
});
