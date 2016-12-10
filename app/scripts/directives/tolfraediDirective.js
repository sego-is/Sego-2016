(function () {
  'use strict';
  angular
    .module('segoapp')
    .directive('tolfraedi', ['gluggaService', 'backendFactory', 'dagatalFactory', function (gluggaService, backendFactory, dagatalFactory) {
      console.log("TölfræðiGluggi");
      return {
        restrict: 'E',
        scope: {
          close: '&close'
        },
        templateUrl: '../../views/static.html',
        link: function ($scope) {

          //$scope.data = [300, 500, 100];

          $scope.close = function () {
            gluggaService.destroy();
          };

          $scope.klipparar = function () {
            gluggaService.stillingarGluggi();
          };

          $scope.verdlisti = function () {
            gluggaService.stillaVerdGluggi();
          };

          var klipparaBokanir = {};
          var staffid = backendFactory.Staff();
          console.log("STAFFID:", staffid);
          backendFactory.getBookingByMonth(dagatalFactory.getStringForDate()).then(function(res) {
            for (var i in res.data) {
              console.log("res.data[i]:", res.data[i]);
              for (var j in res.data[i].bookings) {

                if (klipparaBokanir[res.data[i].bookings[j].staff_id] === undefined) {
                  klipparaBokanir[res.data[i].bookings[j].staff_id] = {};
                  klipparaBokanir[res.data[i].bookings[j].staff_id].income = 0;
                  klipparaBokanir[res.data[i].bookings[j].staff_id].bookings = 0;
                }
                klipparaBokanir[res.data[i].bookings[j].staff_id].bookings += 1;
                for (var k in res.data[i].bookings[j].service) {
                  klipparaBokanir[res.data[i].bookings[j].staff_id].income += res.data[i].bookings[j].service[k].price;
                }
              }
            }
            $scope.labels = Object.keys(klipparaBokanir).map(function(key) { return key; });
            $scope.data = Object.keys(klipparaBokanir).map(function(key) { return klipparaBokanir[key].income; });
            console.log("RESPOND getBookingByMonth, klipparaBokanir:", klipparaBokanir);
          });
        }
      };
    }]);
})();
