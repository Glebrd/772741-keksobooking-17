'use strict';
(function () {
  document.querySelector('.map__filters').addEventListener('change', function () {
    window.map.removePins();
    window.debounce(window.map.addPins);
    window.card.remove();
  });

})();
