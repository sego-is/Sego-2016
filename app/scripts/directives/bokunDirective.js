(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('bokun', ['backendFactory', 'dagatalFactory', function (backendFactory, dagatalFactory, $parse) {
      return {
        restrict: 'E',
        scope: {
          close: '&close',
          change: '&bookingChange',
          objFrom: '=objFrom'
        },
        templateUrl: '../../views/bokun.html',
        link: function (scope) {

          scope.timi =         dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
          scope.endTime =      dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.endTime));
          scope.totalPrice =   0;
          scope.objFrom.date = dagatalFactory.getStringForDate(new Date(scope.objFrom.startTime));

          for (var i in scope.objFrom.service) {
            scope.totalPrice += scope.objFrom.service[i].price;
          }

          scope.afBoka = function () {
            backendFactory.removeBooking(scope.objFrom).then(function (res) {
              scope.close();
            }, function (err) {
              console.log("ERROR removeBooking:", err);
            })
          };

          scope.breytaBokun = function () {
            scope.change(scope.objFrom);
            scope.close();
          };

          scope.ekkiBokun = function () {
            backendFactory.notAttendBooking(scope.objFrom).then(function (res) {
              scope.close();
            }, function (err) {
              console.log("ERROR notAttending:", err);
            });
          };
        }
      };
    }]);
})();
