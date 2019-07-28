'use strict';
(function () {
  document.querySelector('.map__filters').addEventListener('change', function () {
    window.debounce(
        function () {
          window.card.remove();
          window.map.removePins();
          window.map.addPins();
        }
    );
  });

})();
