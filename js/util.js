'use strict';
(function () {
  // Генерируем случайное число
  window.util = {
    generateRandomNumber: function (max) {
      return Math.floor(Math.random() * max);
    },
    ENABLE: true,
    DISABLE: false
  };
})();
