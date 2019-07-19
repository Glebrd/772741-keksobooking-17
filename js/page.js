'use strict';
(function () {
  var enablePage = function () {
    window.form.setAvailability(window.util.ENABLE);
    window.form.brighten();

    window.backend.exchange('https://js.dump.academy/keksobooking/data', 'GET', window.map.doOnLoad, window.error.create);
  };

  var disablePage = function (advertisementForm, mainPinX, mainPinY) {
    window.backend.exchange('https://js.dump.academy/keksobooking', 'POST',
        function () {
          advertisementForm.reset();
          window.form.fillAdressField(mainPinX, mainPinY);
          window.form.setAvailability(window.util.DISABLE);
          window.form.fade();
          window.map.hide();
          window.map.removePins();
          window.map.resetMainPin();
        }
        , window.error.create, new FormData(advertisementForm));
  };

  window.page = {enable: enablePage, disable: disablePage};
})();
