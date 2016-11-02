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
    .controller('HomeCtrl', ['$scope', '$compile', 'dagatalFactory', 'backendFactory', function ($scope, $compile, dagatalFactory, backendFactory) {
      
      // GET COMPANY INFORMATION BY AUTH_ID THAT WAS CONNECTING //
      var p = JSON.parse(localStorage.getItem('profile'));
      backendFactory.getCompanyByAuthID(p.user_id).then(function successCallback(response) {
          backendFactory.setID(response.data[0]._id);
          $scope.staff = response.data[0].staff;
          console.log("RESPONSE STAFF", response.data[0].staff);
      }, function errorCallback(error) {
            console.log("ERROR", error);
      });
      
     
      // FOR THE BOOKING WHEN TIME IS PICKED ON DAILY SCHEDULE
      var booking;
      var valinnDagur;
      
      $scope.openBooking = function (t, b) {
        if (t === undefined) {
          console.log("UNDEFINED");
        } else {
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          booking = $scope.$new();
          var compiledDirective;
          $scope.clickOnTimapant = {
            nafn: b,
            timi: t,
            dags: dagatalFactory.dags(valinnDagur, t)
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
