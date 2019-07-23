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

  var main = document.querySelector('main');
  // Находим шаблон ошибки
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var newErrorPopup = errorTemplate.cloneNode(true);

  var createErrorPopup = function (message) {
    newErrorPopup.querySelector('p').textContent = message;
    addModal(newErrorPopup);
  };

  // Находим шаблон сообщение об успехе
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var newSuccessPopup = successTemplate.cloneNode(true);

  var createSuccessPopup = function () {
    addModal(newSuccessPopup);
  };

  window.modal = {error: createErrorPopup, success: createSuccessPopup};
})();
