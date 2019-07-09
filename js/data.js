'use strict';
(function () {


  // Добавляем элементы из контейцнера на страницу
  var saveAdvertisements = function (advertisements) {
    window.data.advertisements = advertisements;
  };

  var getAdvertisements = function () {
    return window.data.advertisements;
  };


  var offers = {
    palace: 10000,
    flat: 5000,
    house: 1000,
    bungalo: 0
  };


  window.data = {
    saveAdvertisements: saveAdvertisements,
    getAdvertisements: getAdvertisements,
    offers: offers
  };
})();
