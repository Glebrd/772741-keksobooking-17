'use strict';
(function () {
  // Взяли шаблон
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // Взяли элемент, перед которым будем добавлять
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapForInserting = document.querySelector('.map');

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
      photo.src = currentAdvertisement.offer.photos[i];
      photo.style = 'height: 40px; width: 45px';
      photo.alt = 'Фотография жилья';
      photos.appendChild(photo);
    }
  };

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
  var addCard = function (cardToAdd) {
    mapForInserting.insertBefore(cardToAdd, mapFiltersContainer);
  };
  var createNewCard = function (currentAdvertisement, evt) {
    if (currentAdvertisement) {
      window.map.activatePin(evt.currentTarget);
      addCard(renderCard(currentAdvertisement));
    }
  };

  var removeCard = function () {
    var openedCard = document.querySelector('.map__card');

    if (!openedCard) {
      return;
    }
    openedCard.remove();
    window.map.deactivatePin();
  };

  window.card = {add: createNewCard, remove: removeCard};
})();
