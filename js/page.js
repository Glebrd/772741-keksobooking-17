'use strict';
(function () {
  var enablePage = function () {
    window.form.setAvailability(window.util.ENABLE);
    window.form.brighten();

    window.backend.exchange('https://js.dump.academy/keksobooking/data', 'GET', window.map.doOnLoad, window.error.create);
  };
  window.page = {enable: enablePage};
})();
