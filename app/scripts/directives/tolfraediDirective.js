(function () {
  'use strict';
  angular
    .module('segoapp')
    .directive('tolfraedi', ['gluggaService', 'backendFactory', 'dagatalFactory', function (gluggaService, backendFactory, dagatalFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close'
        },
        templateUrl: '../../views/static.html',
        link: function ($scope) {

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
          backendFactory.getBookingByMonth(dagatalFactory.getStringForDate()).then(function (res) {
            for (var i in res.data) {
              console.log("res.data[i]:", res.data[i]);
              for (var j in res.data[i].bookings) {
                if (klipparaBokanir[res.data[i].bookings[j].staff_id] === undefined) {
                  klipparaBokanir[res.data[i].bookings[j].staff_id] = {};
                  klipparaBokanir[res.data[i].bookings[j].staff_id].income = 0;
                  klipparaBokanir[res.data[i].bookings[j].staff_id].bookings = 0;
                  klipparaBokanir[res.data[i].bookings[j].staff_id].name = backendFactory.getStaffById(res.data[i].bookings[j].staff_id);
                }
                klipparaBokanir[res.data[i].bookings[j].staff_id].bookings += 1;
                for (var k in res.data[i].bookings[j].service) {
                  klipparaBokanir[res.data[i].bookings[j].staff_id].income += res.data[i].bookings[j].service[k].price;
                }
              }
            }
            $scope.labels = Object.keys(klipparaBokanir).map(function (key) {
              return klipparaBokanir[key].name;
            });
            $scope.data = Object.keys(klipparaBokanir).map(function (key) {
              return klipparaBokanir[key].income;
            });
            $scope.books = Object.keys(klipparaBokanir).map(function (key) {
              return klipparaBokanir[key].bookings;
            });
          });
        }
      };
    }]);
})();
