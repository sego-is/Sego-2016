(function () {
  'use strict';
  angular
    .module('segoapp')
    .directive('verdlisti', ['backendFactory', function (backendFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close'
        },
        templateUrl: '../../views/verdlisti.html',
        link: function (scope) {
          if (!backendFactory.service) {
            backendFactory.getService().then(function (res) {
              scope.pricelist = res.data;
            }, function (err) {
              console.log("ERROR getStaff(): ", err);
            });
          }

        }
      };
    }]);
})();
