'use strict';
(function () {
  // Взяли шаблон
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // Взяли элемент, перед которым будем добавлять
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapForInserting = document.querySelector('.map');

  var cardElement = 0;

  // Заполняем карточку объявления
  var fillCard = function () {
    var currentData = window.filter(window.data);
    cardElement.querySelector('.popup__title').innerHTML = currentData[0].offer.title;
    cardElement.querySelector('.popup__text--price').innerHTML = currentData[0].offer.price + '₽/ночь';
  };

  // Клонируем шаблон
  var renderCard = function () {
    cardElement = cardTemplate.cloneNode(true);
    fillCard();
    return cardElement;
  };

  var addCard = function () {
    mapForInserting.insertBefore(renderCard(), mapFiltersContainer);
  };

  window.card1 = {add: addCard, fill: fillCard};
})();
