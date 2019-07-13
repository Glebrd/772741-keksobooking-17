'use strict';
(function () {
  document.querySelector('.map__filters').addEventListener('change', function () {
    window.map.removePins();
    window.map.addPins();
    window.card.remove();
    window.card.add((window.filter(window.data.get()))[0]);
  });

})();
