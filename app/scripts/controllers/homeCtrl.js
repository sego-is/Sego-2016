(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name segoEnnOgAfturApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the segoEnnOgAfturApp
   */
  angular.module('segoApp')
    .controller('HomeCtrl', ['$scope', 'dagatalFactory', '$http', function ($scope, dagatalFactory, $http) {

      $scope.openBooking = function (a, b) {
        if (a === undefined) {
          console.log("UNDEFINED");
        }
        else {
          console.log("bóka hjá " + b.name + " klukkan " + a);
        }
      };


        $http({
            url: 'http://wwww.sego.is:6969/api/booking',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }}).then(function (response) {
              console.log("RESPONSE:" + response);
        }, function(err) {
            console.log("ERROR", JSON.stringify(err));
        });

      var stillingar = {
        upphafsTimi: 3600 * 7,
        endaTimi: 3600 * 22,
        lotan: 900
      };

      $scope.times = [];

      var initTimes = function () {
        var i;
        for (i = stillingar.upphafsTimi; i <= stillingar.endaTimi; i += stillingar.lotan) {
          $scope.times.push(dagatalFactory.timasetning(i));
        }
      };


      $scope.names = [{
        'id': 1,
        'name': 'Einar'
      }, {
        'id': 2,
        'name': 'Siggi'
      }, {
        'id': 3,
        'name': 'Efro'
      }, {
        'id': 4,
        'name': 'Kaplo'
      }, {
        'id': 5,
        'name': 'Ostaran'
      }, {
        'id': 6,
        'name': 'Mandalana'
      }];

      $scope.bookings = [{
        'time': '8:00',
        'name': 'Einar'
      }, {
        'time': '9:00',
        'name': 'Siggi'
      }, {
        'time': '10:00',
        'name': 'Efro'
      }, {
        'time': '11:00',
        'name': 'Kaplo'
      }, {
        'time': '12:00',
        'name': 'Ostaran'
      }, {
        'time': '13:00',
        'name': 'Mandalana'
      }];

      $scope.$on('dagsetning', function (e, a) {
        initTimes();
        $scope.dagurinnIdag = dagatalFactory.dagsetning(a.getDay(), a.getDate(), a.getMonth());
      });
    }]);
})();
