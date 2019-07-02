'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MIN_Y = 130;
  var PIN_MAX_Y = 630;

  window.data = {
    offers: {
      palace: 10000,
      flat: 5000,
      house: 1000,
      bungalo: 0
    }
  };

  // Создаём массив, состоящий из 8 сгенерированных JS объектов
  // window.data.generateAdvertisements = function (numberOfAdvertisements) {
  //   var pinMaxX = document.querySelector('.map__pins').offsetWidth - PIN_WIDTH;
  //   var advertisements = [];
  //   var offerKeys = Object.keys(window.data.offers);
  //   for (var i = 0; i < numberOfAdvertisements; i++) {
  //     advertisements[i] = {
  //       author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
  //       offer: {type: offerKeys[window.util.generateRandomNumber(offerKeys.length)]},
  //       // Задаём расположение острого конца метки
  //       location: {x: window.util.generateRandomNumber(pinMaxX) + PIN_WIDTH / 2, y: PIN_MIN_Y + window.util.generateRandomNumber(PIN_MAX_Y - PIN_MIN_Y) + PIN_HEIGHT}
  //     };
  //   }
  //   return advertisements;
  // };
  window.data = {advertisements: 0};
})();
