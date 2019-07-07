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
    housingPriceInput.min = window.data.offers[housingTypeSelect.value];
    housingPriceInput.placeholder = window.data.offers[housingTypeSelect.value];
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
    window.backend.exchange('https://js.dump.academy/keksobooking', 'POST',
        function () {
          advertisementForm.reset();
          window.form.fillAdressField(mainPinX, mainPinY);
          window.form.setAvailability(window.util.DISABLE);
          window.form.fade();
          window.map.hideMap();
          window.map.removePins();
          window.map.resetMainPin();
        }
        , window.error.create, new FormData(advertisementForm));
    evt.preventDefault();
  });
})();
