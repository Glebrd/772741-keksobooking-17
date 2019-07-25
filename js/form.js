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

  // Проверка соответстви количества комнат количеству гостей.
  var roomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Запрещаем отправлять форму, если было выбрано количество мест, не соответствующще количеству комнат или наоборот.
  var setCapacityValidity = function () {
    if (!roomCapacity[roomNumber.value].includes(capacity.value)) {
      capacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  // Запрещаем выбор количества мест (отключаем опцию), если оно не соответствует количеству комнат
  // Для случаев, когда пользователь сначала выбирает количество комнат.
  var onRoomNumberChange = function () {
    var guests = roomCapacity[roomNumber.value];
    setCapacityValidity();
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = guests.indexOf(capacity.options[i].value, 0);
    }
  };

  roomNumber.addEventListener('change', onRoomNumberChange);

  // Для случаев, когда пользователь сначала выбирает количество гостей.
  var onCapacityChange = function () {
    setCapacityValidity();
  };

  setCapacityValidity();
  capacity.addEventListener('change', onCapacityChange);

  // Загрузка превью

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form-header__input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');

  var fileUpload = function (file, preview) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  // Обработка стандартного подбора
  avatarFileChooser.addEventListener('change', function () {
    fileUpload(avatarFileChooser.files[0], avatarPreview);
  });
  // Обработка подбора через drag and drop.
  avatarDropZone.addEventListener('drop', function (evt) {
    avatarFileChooser.files = evt.dataTransfer.files;
    fileUpload(avatarFileChooser.files[0], avatarPreview);
    avatarDropZone.style.color = '';
  });

  // Измнение стилей, при перетаскивании элемента.

  var colorize = function (dropZone) {
    dropZone.style.color = '#ff5635';
  };

  var decolorize = function (dropZone) {
    dropZone.style.color = '';
  };

  avatarDropZone.addEventListener('dragenter', function () {
    colorize(avatarDropZone);
  });

  avatarDropZone.addEventListener('dragleave', function () {
    decolorize(avatarDropZone);
  });

  // Предотваращем открытие файла в новом окне, при перетягивании на страницу.

  window.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  window.addEventListener('drop', function (evt) {
    evt.preventDefault();
  });

  // Для фотографий
  var photosDropZone = document.querySelector('.ad-form__drop-zone');
  var photosFileChooser = document.querySelector('.ad-form__input[type=file]');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var photoWrapper = document.querySelector('.ad-form__photo');
  var createPhotoPreview = function () {
    photoWrapper = document.querySelector('.ad-form__photo');
    var image = document.createElement('img');
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';
    image.style.margin = '0 auto';
    image.style.display = 'block';
    if (photosContainer.children[photosContainer.children.length - 1].children.length !== 0) {
      var newDiv = photoWrapper.cloneNode(true);
      photoWrapper = newDiv;
      photosContainer.appendChild(photoWrapper);
    }
    photoWrapper.appendChild(image);
    return image;
  };

  var removePhotos = function () {
    if (photosContainer.querySelector('img')) {
      for (var i = photosContainer.children.length - 1; i > 1; i--) {
        photosContainer.children[i].remove();
      }
      photosContainer.querySelector('img').remove();
    }
  };

  photosDropZone.addEventListener('dragenter', function () {
    colorize(photosDropZone);
  });

  photosDropZone.addEventListener('dragleave', function () {
    decolorize(photosDropZone);
  });


  photosFileChooser.addEventListener('change', function () {
    removePhotos();
    for (var i = 0; i < photosFileChooser.files.length; i++) {
      fileUpload(photosFileChooser.files[i], createPhotoPreview());
    }
  });

  photosDropZone.addEventListener('drop', function (evt) {
    removePhotos();
    photosFileChooser.files = evt.dataTransfer.files;
    for (var i = 0; i < photosFileChooser.files.length; i++) {
      fileUpload(photosFileChooser.files[i], createPhotoPreview());
    }
  });

})();
