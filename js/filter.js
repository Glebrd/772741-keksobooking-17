'use strict';
(function () {
  var MAXIMUM_PRICE = 50000;
  var MINIMUM_PRICE = 10000;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var filter = function (data) {
    var filtredData = data.filter(function (item) {
      return checkHousingType(item) &&
        checkOffer(item) &&
        checkHousingPrice(item) &&
        checkHousingRooms(item) &&
        checkHousingGuests(item) &&
        checkFeatures(item);
    });
    return filtredData;
  };

  var checkHousingType = function (item) {
    return (housingType.value === item.offer.type ||
    checkAny(housingType.value));
  };

  // Группа фильтров features
  var choosenFeatures = [];
  var currentFeatures = document.querySelector('.map__filters').querySelectorAll('input[type="checkbox"]:checked');

  var getCurrentFeatures = function () {
    choosenFeatures = [];
    currentFeatures.forEach(function (elment) {
      choosenFeatures.push(elment.value);
    });
    return choosenFeatures;
  };

  var checkFeatures = function (item) {
    var checkedFeatures = getCurrentFeatures();
    return checkedFeatures.every(function (element) {
      return item.offer.features.includes(element);
    });
  };

  // Фильтр цена
  var checkHousingPrice = function (item) {
    return ((housingPrice.value === 'high' && item.offer.price > MAXIMUM_PRICE) ||
      (housingPrice.value === 'middle' && item.offer.price < MAXIMUM_PRICE && item.offer.price > MINIMUM_PRICE) ||
      (housingPrice.value === 'low' && item.offer.price < MINIMUM_PRICE) ||
      checkAny(housingPrice.value));
  };

  // Фильтр количество комнат
  var checkHousingRooms = function (item) {
    return ((parseInt(housingRooms.value, 10) === item.offer.rooms) ||
      checkAny(housingRooms.value));
  };

  // Фильтр количество людей
  var checkHousingGuests = function (item) {
    return ((parseInt(housingGuests.value, 10) === item.offer.guests) ||
    checkAny(housingGuests.value));
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
