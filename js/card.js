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

  // Массовая установка атрибутов элементу
  function setAttributes(element, attributes) {
    for (var key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  // Заполняем удобства
  var addFeatures = function (currentAdvertisement) {
    var features = cardElement.querySelector('.popup__features');
    features.innerHTML = '';
    for (var i = 0; i < currentAdvertisement.offer.features.length; i++) {
      var newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature', 'popup__feature--' + currentAdvertisement.offer.features[i]);
      features.appendChild(newFeature);
    }
  };

  // Заполняем фото
  var addPhotos = function (currentAdvertisement) {
    var photos = cardElement.querySelector('.popup__photos');
    photos.innerHTML = '';
    for (var i = 0; i < currentAdvertisement.offer.photos.length; i++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      setAttributes(photo, {'src': currentAdvertisement.offer.photos[i], 'height': '40px', 'width': '45px', 'alt': 'Фотография жилья'});
      photos.appendChild(photo);
    }
  };

  // Заполняем карточку объявления
  var fillCard = function (currentAdvertisement) {
    cardElement.querySelector('.popup__title').innerHTML = currentAdvertisement.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = currentAdvertisement.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = currentAdvertisement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__text--capacity').innerHTML = currentAdvertisement.offer.rooms + ' комнаты для ' + currentAdvertisement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + currentAdvertisement.offer.checkin + ', выезд до ' + currentAdvertisement.offer.checkout;
    cardElement.querySelector('.popup__description').innerHTML = currentAdvertisement.offer.description;
    cardElement.querySelector('.popup__avatar').src = currentAdvertisement.author.avatar;
    cardElement.querySelector('.popup__type').innerHTML = window.data.housingType[currentAdvertisement.offer.type].name;
    addFeatures(currentAdvertisement);
    addPhotos(currentAdvertisement);
  };

  // Клонируем шаблон
  var renderCard = function () {
    cardElement = cardTemplate.cloneNode(true);
    fillCard(window.filter(window.data.get())[0]);
    return cardElement;
  };

  var addCard = function () {
    mapForInserting.insertBefore(renderCard(), mapFiltersContainer);
  };

  window.card = {add: addCard, fill: fillCard};
})();
