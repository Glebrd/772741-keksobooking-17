'use strict';
(function () {
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
        element.setAttribute(key, attributes[key]);
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
      setAttributes(photo, {'src': currentAdvertisement.offer.photos[i], 'height': '40px', 'width': '45px', 'alt': 'Фотография жилья'});
      photos.appendChild(photo);
    }
  };

  // Клонируем шабло
  var renderCard = function (currentAdvertisement) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').innerHTML = currentAdvertisement.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = currentAdvertisement.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = currentAdvertisement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').innerHTML = currentAdvertisement.offer.rooms + ' комнаты для ' + currentAdvertisement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + currentAdvertisement.offer.checkin + ', выезд до ' + currentAdvertisement.offer.checkout;
    cardElement.querySelector('.popup__description').innerHTML = currentAdvertisement.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentAdvertisement.author.avatar;
    cardElement.querySelector('.popup__type').innerHTML = window.data.housingType[currentAdvertisement.offer.type].name;
    addFeatures(currentAdvertisement, cardElement);
    addPhotos(currentAdvertisement, cardElement);
    cardElement.querySelector('.popup__close').addEventListener('click', onButtonCloseClick);
    document.addEventListener('keydown', onButtonEscPress);
    return cardElement;
  };

  var onButtonCloseClick = function () {
    removeCard();
  };

  var onButtonEscPress = function (evt) {
    window.util.isEscKey(evt, removeCard);
  };

  // Добавляем карточку на страницу
  var addCard = function (elementToAdd) {
    mapForInserting.insertBefore(elementToAdd, mapFiltersContainer);
  };

  var createNewCard = function (currentAdvertisement) {
    if (currentAdvertisement) {
      addCard(renderCard(currentAdvertisement));
    }
  };

  var removeCard = function () {
    var cardToDelete = document.querySelector('.map__card');
    if (cardToDelete) {
      cardToDelete.remove();
    }
  };

  window.card = {add: createNewCard, remove: removeCard};
})();
