(function () {
  'use strict';

  angular.module('segoapp')
    .controller('StatisticCtrl', ['$scope', 'gluggaService', 'dagatalFactory', 'backendFactory', 
    function ($scope, gluggaService, dagatalFactory, backendFactory) {
            
            //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            $scope.data = [300, 500, 100];
            
            var klipparaBokanir = {};
            var staffid = backendFactory.Staff();

            backendFactory.getBookingByMonth(dagatalFactory.getStringForDate()).then(function(res) {
                for (var i in res.data) {
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
            });
            
    }]);
})();
