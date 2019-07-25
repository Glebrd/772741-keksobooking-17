'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var filter = function (data) {
    var filtredData = data.filter(function (item) {
      return checkHousingType(item) && checkOffer(item) && checkHousingPrice(item) && checkHousingRooms(item) && checkHousingGuests(item) && checkFeatures(item);
    });
    return filtredData;
  };

  var checkHousingType = function (item) {
    if (housingType.value === 'any') {
      return true;
    }
    return housingType.value === item.offer.type;
  };

  // Группа фильтров features
  var choosenFeatures = [];

  var getCurrentFeatures = function () {
    choosenFeatures = [];
    var currentFeatures = document.querySelector('.map__filters').querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < currentFeatures.length; i++) {
      choosenFeatures.push(currentFeatures[i].value);
    }
    return choosenFeatures;
  };

  var checkFeatures = function (item) {
    var currentFeatures = getCurrentFeatures();
    return currentFeatures.every(function (element) {
      return item.offer.features.includes(element);
    });
  };

  // Фильтр цена
  var MAXIMUM_PRICE = 50000;
  var MINIMUM_PRICE = 10000;
  var checkHousingPrice = function (item) {
    if (housingPrice.value === 'high' && item.offer.price > MAXIMUM_PRICE) {
      return true;
    } else if (housingPrice.value === 'middle' && item.offer.price < MAXIMUM_PRICE && item.offer.price > MINIMUM_PRICE) {
      return true;
    } else if (housingPrice.value === 'low' && item.offer.price < MINIMUM_PRICE) {
      return true;
    } return checkAny(housingPrice.value);
  };

  // Фильтр количество комнат
  var checkHousingRooms = function (item) {
    if (parseInt(housingRooms.value, 10) === item.offer.rooms) {
      return true;
    } return checkAny(housingRooms.value);
  };

  // Фильтр количество людей
  var checkHousingGuests = function (item) {
    if (parseInt(housingGuests.value, 10) === item.offer.guests) {
      return true;
    } return checkAny(housingGuests.value);
  };

  // Проверяем, что offer заполнено
  var checkOffer = function (item) {
    return item.hasOwnProperty('offer');
  };
  // Проверка на значение фильтра "Любое"
  var checkAny = function (element) {
    return element === 'any';
  };
  window.filter = filter;
})();
