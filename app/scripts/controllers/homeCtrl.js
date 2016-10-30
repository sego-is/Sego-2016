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
    .controller('HomeCtrl', ['$scope', '$compile', 'dagatalFactory', '$http', function ($scope, $compile, dagatalFactory, $http) {

      // FOR THE BOOKING WHEN TIME IS PICKED ON DAILY SCHEDULE
      var booking;
      var valinnDagur;
      
      $scope.openBooking = function (a, b) {
        if (a === undefined) {
          console.log("UNDEFINED");
        } else {
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          booking = $scope.$new();
          var compiledDirective;
          $scope.clickOnTimapant = {
            nafn: b,
            timi: a,
            dags: dagatalFactory.dags(valinnDagur, a)
          };
          compiledDirective = $compile('<boka class="skilabod" close="lokaBokun()" obj-from="clickOnTimapant"></boka>');
          var directiveElement = compiledDirective(booking);
          $('.skilaboda-haldari').append(directiveElement);
        }
      };

      $scope.lokaBokun = function () {
        booking.$destroy();
        $('.skilaboda-haldari').empty();
        document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "hidden";
        console.log("BUTTON_CLICK");
      };
      // END OF BOOKING CLICK


      // Initialize the time (clock) in booking for the day
      var stillingar = {
        upphafsTimi: 3600 * 7,
        endaTimi:    3600 * 22,
        lotan:       900
      };

      $scope.times = [];

      var initTimes = function () {
        var i;
        for (i = stillingar.upphafsTimi; i <= stillingar.endaTimi; i += stillingar.lotan) {
          $scope.times.push(dagatalFactory.timasetning(i));
        }
      };
      // END OF INITIALIZE TIME

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
        valinnDagur = a;
        $scope.dagurinnIdag = dagatalFactory.dagsetning(a.getDay(), a.getDate(), a.getMonth());
      });
    }]);
})();
