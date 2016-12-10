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
            scope.objFrom.date = dagatalFactory.getStringForDate(new Date(scope.objFrom.startTime));
            console.log("scope.objFrom:", scope.objFrom);
            
            for (var i in scope.objFrom.service) {
                scope.totalPrice += scope.objFrom.service[i].price;
            }
            
            scope.afBoka = function() {
                console.log("afBoka");
                 backendFactory.removeBooking(scope.objFrom).then(function(res) {
                     console.log("RESPINT removeBooking:", res);
                 }, function(err) {
                     console.log("ERROR removeBooking:", err);
                 })
            };
            
            scope.breytaBokun = function() {
                console.log("breytaBokun");
            };
            
            scope.ekkiBokun = function() {
                backendFactory.notAttendBooking(scope.objFrom).then(function(res) {
                    console.log("RESPINT notAttending:", res);
                }, function(err) {
                    console.log("ERROR notAttending:", err);
                });
                
                console.log("bokudBokun");
            };

        }
      };
    }]);
})();