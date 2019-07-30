'use strict';
(function () {

  var onModalClick = function () {
    removeModal();
  };

  var onButtonEscPress = function (evt) {
    window.util.isEscKey(evt, removeModal);
  };
  // Добавление модального окна
  var addModal = function (element) {
    main.appendChild(element);
    document.addEventListener('keydown', onButtonEscPress);
    document.addEventListener('mousedown', onModalClick);
  };
  // Удаление моадльного окна
  var removeModal = function () {
    var modal = main.querySelector('.error, .success');
    modal.remove();
    document.removeEventListener('keydown', onButtonEscPress);
    document.removeEventListener('mousedown', onModalClick);
  };

  var main = document.querySelector('main');

  // Находим шаблон
  var getModalTemplate = function (modalType) {
    var errorTemplate = document.querySelector('#' + modalType)
      .content
      .querySelector('.' + modalType);
    var newModal = errorTemplate.cloneNode(true);
    return newModal;
  };
  // Добавление окна с сообщением об ошибке
  var createErrorModal = function (message) {
    var errorModal = getModalTemplate('error');
    errorModal.querySelector('p').textContent = message;
    addModal(errorModal);
  };
  // Добавление окна с сообщением об успешной загрузке.
  var createSuccessModal = function () {
    addModal(getModalTemplate('success'));
  };

  window.modal = {error: createErrorModal, success: createSuccessModal};
})();


