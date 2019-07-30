'use strict';
(function () {
  var enablePage = function () {
    window.form.setAvailability(window.util.ENABLE);
    window.form.brighten();

    window.backend.exchange('https://js.dump.academy/keksobooking/data', 'GET', window.map.doOnLoad, window.modal.error);
  };

  var disablePage = function () {
    window.form.reset();
    window.form.resetAdressField();
    window.form.removePhotos();
    window.form.removeAvatar();
    window.form.setAvailability(window.util.DISABLE);
    window.form.fade();
    window.card.remove();
    window.map.hide();
    window.map.removePins();
    window.map.resetMainPin();
  };

  window.page = {enable: enablePage, disable: disablePage};
})();
