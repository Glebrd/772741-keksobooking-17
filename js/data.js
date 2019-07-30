'use strict';
(function () {


  // Добавляем элементы из контейцнера на страницу
  var saveAdvertisements = function (advertisements) {
    window.data.advertisements = advertisements;
  };

  var getAdvertisements = function () {
    return window.data.advertisements;
  };


  var housingType = {
    palace: {price: 10000, name: 'Дворец'},
    flat: {price: 1000, name: 'Квартира'},
    house: {price: 5000, name: 'Дом'},
    bungalo: {price: 0, name: 'Бунгало'}
  };


  window.data = {
    save: saveAdvertisements,
    get: getAdvertisements,
    housingType: housingType
  };
})();
