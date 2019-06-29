'use strict';
(function () {
  var form = document.querySelector('.ad-form');
  window.advertisementForm = {
    // Отключение формы
    activate: function () {
      var fieldsets = form.getElementsByTagName('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = false;
      }
      // Убираем класс
      form.classList.remove('ad-form--disabled');
    },
    // Включение формы
    deactivate: function () {
      // Включаем поля
      var fieldsets = form.getElementsByTagName('fieldset');
      for (var i = 0; i < fieldsets.length; i++) {
        fieldsets[i].disabled = true;
      }
      // Добавляем класс
      form.classList.add('ad-form--disabled');
    }
  };

  // Выключили форму при открытии страницы
  window.advertisementForm.deactivate();

  // Заполние поля Адрес
  var mapPin = document.querySelector('.map__pin--main');
  var mainPinY = mapPin.offsetTop;
  var mainPinX = mapPin.offsetLeft;
  var address = document.getElementById('address');

  window.form = {
    fillAdressField: function (X, Y) {
      address.value = X + ', ' + Y;
    }
  };

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
})();
