'use strict';
(function () {
  var advertisementForm = document.querySelector('.ad-form');
  window.form = {
    // Включение формы / Отключение формы
    setAvailability: function (enable) {
      var fieldsets = advertisementForm.querySelectorAll('.ad-form__element, .ad-form-header');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = !enable;
      }
    },
    fade: function () {
      advertisementForm.classList.add('ad-form--disabled');
    },
    brighten: function () {
      advertisementForm.classList.remove('ad-form--disabled');
    },
    fillAdressField: function (x, y) {
      address.value = x + ', ' + y;
    }
  };

  // Выключили форму при открытии страницы
  window.form.setAvailability(window.util.DISABLE);

  // Заполние поля Адрес
  var mapPin = document.querySelector('.map__pin--main');
  var mainPinY = mapPin.offsetTop;
  var mainPinX = mapPin.offsetLeft;
  var address = document.getElementById('address');

  window.form.fillAdressField(mainPinX, mainPinY);

  // Валидация полей "Тип жилья" и "Цена за ночь"
  var housingTypeSelect = document.querySelector('#type');
  var housingPriceInput = document.querySelector('#price');

  var housingTypeInputFill = function () {
    housingPriceInput.min = window.data.housingType[housingTypeSelect.value].price;
    housingPriceInput.placeholder = window.data.housingType[housingTypeSelect.value].price;
  };

  housingTypeSelect.addEventListener('change', housingTypeInputFill);

  // Валидация полей Время заезда и выезда
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  var onTimeInSelect = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var onTimeOutSelect = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  timeInSelect.addEventListener('change', onTimeInSelect);
  timeOutSelect.addEventListener('change', onTimeOutSelect);

  advertisementForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.page.disable(advertisementForm, mainPinX, mainPinY);
  });

  var roomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Запрещаем выбор количества мест (отключаем опцию), если оно не соответствует количеству комнат
  // Для случаев, когда пользователь сначала выбирает количество комнат.
  var onRoomNumberChange = function () {
    var guests = roomCapacity[roomNumber.value];
    capacity.value = guests[0];
    for (var i = 0; i < capacity.options.length; i++) {
      if (guests.includes(capacity.options[i].value)) {
        capacity.options[i].disabled = false;
      } else {
        capacity.options[i].disabled = true;
      }
    }
  };

  roomNumber.addEventListener('change', onRoomNumberChange);

  // Запрещаем отправлять форму, если было выбрано количество мест, не соответствующще количеству комнат.
  // Для случаев, когда пользователь сначала выбирает количество мест.
  var setCapacityValidity = function () {
    if (!roomCapacity[roomNumber.value].includes(capacity.value)) {
      capacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var onCapacityChange = function () {
    setCapacityValidity();
  };

  setCapacityValidity();
  capacity.addEventListener('change', onCapacityChange);

})();
