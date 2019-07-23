'use strict';
(function () {

  var onModalClick = function () {
    removeModal();
  };

  var onButtonEscPress = function (evt) {
    window.util.isEscKey(evt, removeModal());
  };

  var addModal = function (element) {
    main.appendChild(element);
    document.addEventListener('keydown', onButtonEscPress);
    document.addEventListener('mousedown', onModalClick);
  };

  var removeModal = function () {
    var modal = main.querySelector('.error, .success');
    modal.remove();
    document.removeEventListener('keydown', onButtonEscPress);
    document.removeEventListener('mousedown', onModalClick);
  };

  // Находим шаблон ошибки
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var newError = errorTemplate.cloneNode(true);
  var main = document.querySelector('main');

  var createError = function (message) {
    newError.querySelector('p').textContent = message;
    addModal(newError);
  };

  // Находим шаблон сообщение об успехе
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var newSuccess = successTemplate.cloneNode(true);

  var createSuccess = function () {
    addModal(newSuccess);
  };

  window.error = {create: createError, createSuccess: createSuccess};
})();
