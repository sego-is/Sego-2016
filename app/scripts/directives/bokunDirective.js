(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('bokun', ['backendFactory', 'dagatalFactory', function (backendFactory, dagatalFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close',
          objFrom: '=objFrom'
        },
        templateUrl: '../../views/bokun.html',
        link: function (scope, element, attrs) {
            scope.timi = dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
            console.log("SCOPE.objFROM:", scope.objFrom);
        }
      };
    }]);
})();