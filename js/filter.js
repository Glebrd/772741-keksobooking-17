'use strict';
var housingType = document.querySelector('.map__filter');

var filter = function (data) {
  var filtredData = data.advertisements.filter(function (item) {
    return checkHousingType(item) && checkOffer(item);
  });
  return filtredData;
};

var checkHousingType = function (item) {
  if (housingType.value === 'any') {
    return true;
  }
  return housingType.value === item.offer.type;
};

var checkOffer = function (item) {
  return item.hasOwnProperty('offer');
};

window.filter = filter;
