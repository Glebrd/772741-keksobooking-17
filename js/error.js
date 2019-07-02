'use strict';
(function () {
  // Находим шаблон ошибки
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var newError = errorTemplate.cloneNode(true);
  var main = document.querySelector('main');

  var createError = function () {
    main.appendChild(newError);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      main.removeChild(newError);
      window.backend.exchange('https://js.dump.academy/keksobooking/data', 'GET', window.map.successHandler, window.error.create);
    });
  };

  window.error = {create: createError};
})();
