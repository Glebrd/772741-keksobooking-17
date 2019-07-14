'use strict';
(function () {
  var CARD_IS_CLOSED = -1;
  // Взяли шаблон
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // Взяли элемент, перед которым будем добавлять
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapForInserting = document.querySelector('.map');


  // Массовая установка атрибутов элементу
  function setAttributes(element, attributes) {
    for (var key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element[key] = attributes[key];
      }
    }
  }

  // Заполняем удобства
  var addFeatures = function (currentAdvertisement, cardElement) {
    var features = cardElement.querySelector('.popup__features');
    features.innerHTML = '';
    for (var i = 0; i < currentAdvertisement.offer.features.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature', 'popup__feature--' + currentAdvertisement.offer.features[i]);
      features.appendChild(newFeature);
    }
  };

  // Заполняем фото
  var addPhotos = function (currentAdvertisement, cardElement) {
    var photos = cardElement.querySelector('.popup__photos');
    photos.innerHTML = '';
    for (var i = 0; i < currentAdvertisement.offer.photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      setAttributes(photo, {'src': currentAdvertisement.offer.photos[i], 'style': 'height: 40px; width: 45px', 'alt': 'Фотография жилья'});
      photos.appendChild(photo);
    }
  };

  var renderCard = function (currentAdvertisement, currentIndex) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').innerHTML = currentAdvertisement.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = currentAdvertisement.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = currentAdvertisement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').innerHTML = currentAdvertisement.offer.rooms + ' комнаты для ' + currentAdvertisement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + currentAdvertisement.offer.checkin + ', выезд до ' + currentAdvertisement.offer.checkout;
    cardElement.querySelector('.popup__description').innerHTML = currentAdvertisement.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentAdvertisement.author.avatar;
    cardElement.querySelector('.popup__type').innerHTML = window.data.housingType[currentAdvertisement.offer.type].name;
    cardElement.dataset.data = currentIndex;
    addFeatures(currentAdvertisement, cardElement);
    addPhotos(currentAdvertisement, cardElement);
    cardElement.querySelector('.popup__close').addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onButtonEscPress);
    return cardElement;
  };

  var onButtonCloseClick = function () {
    currentlyOpenedCard.remove();
    currentlyOpenedCard = CARD_IS_CLOSED;
  };

  var onButtonEscPress = function (evt) {
    window.util.isEscKey(evt, removeCard);
    currentlyOpenedCard = CARD_IS_CLOSED;
  };

  // Добавляем карточку на страницу
  var addCard = function (cardToAdd) {
    mapForInserting.insertBefore(cardToAdd, mapFiltersContainer);
  };

  var currentlyOpenedCard = CARD_IS_CLOSED;

  var createNewCard = function (currentAdvertisement, currentIndex) {
    // Проверяем, что после филтрация не принесла пустой результат.
    if (currentAdvertisement) {
      // Ветка для отрисовки первой карточки.
      if (currentlyOpenedCard === CARD_IS_CLOSED) {
        addCard(renderCard(currentAdvertisement, currentIndex));
        currentlyOpenedCard = document.querySelector('.map__card');
        // Ветка для отрисовки последующих карточке (если карточка уже открыта, то не перерисовываем)
      } else if (parseInt(currentlyOpenedCard.dataset.data, 10) !== currentIndex) {
        addCard(renderCard(currentAdvertisement, currentIndex));
        // Сохраняем последнюю открытую карточку в глоабльную переменную, для последующих проверок.
        currentlyOpenedCard = document.querySelector('.map__card');
      }
    }
  };

  var removeCard = function (currentIndex) {
    // Проверяем, что это НЕ первая открытая карточка и что это НЕ  карточка, которая уже открыта
    if (currentlyOpenedCard !== CARD_IS_CLOSED && (parseInt(currentlyOpenedCard.dataset.data, 10)) !== currentIndex) {
      currentlyOpenedCard.remove();
      currentlyOpenedCard = CARD_IS_CLOSED;
    }
  };

  window.card = {add: createNewCard, remove: removeCard};
})();
