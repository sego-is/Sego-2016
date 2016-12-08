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
            scope.totalPrice = 0;
            
            for (var i in scope.objFrom.service) {
                scope.totalPrice += scope.objFrom.service[i].price;
            }
            
            scope.afBoka = function() {
                console.log("afBoka");
            };
            
            scope.breytaBokun = function() {
                console.log("breytaBokun");
            };

        }
      };
    }]);
})();