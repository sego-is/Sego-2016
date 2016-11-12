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

      function update() {
          backendFactory.getBookingByDate(dagatalFactory.dags()).then(function(res) {
              if (res.data.length === 0) {
                  console.log("NO BOOKINGS");
                  $scope.bookings = [];
              }
              else {
                  console.log("BOOKINGS:", res.data[0].bookings);
                  $scope.bookings = res.data[0].bookings;
              }
          }, function(err) {
              console.log("update()->getBookingByDate() ERR:", err);
          });
          $scope.staff = backendFactory.Staff();
          $scope.dagurinnIdag = dagatalFactory.dagsetning();
          $scope.times = dagatalFactory.timabokanir();
      }

      $scope.loadingData = true;

      // GET COMPANY INFORMATION BY AUTH_ID THAT WAS CONNECTING //
      var p = JSON.parse(localStorage.getItem('profile'));
      backendFactory.getCompanyByAuthID(p.user_id).then(function successCallback(response) {
          backendFactory.set(response.data[0]);
          console.log("RESPONSE GET COMPANY BY AUTH ID", response.data[0]);
          update();
          $scope.loadingData = false;
      }, function errorCallback(error) {
            console.log("ERROR", error);
      });

      // Get bookings for selected date in datepicker
      $scope.getDailyBookings = function (t) {
          backendFactory.getBookingByDate(dagatalFactory.dags(new Date(t))).then(function(res) {
              if (res.data.length === 0) {
                  console.log("NO BOOKINGS");
              }
              else {
                  console.log("BOOKINGS:", res.data[0].bookings);
              }
          }, function(err) {
              console.log("homeCtrl.getDailyBooking (err):", err);
          });
        //console.log("getDailyBookings: ", t);
      };


      // FOR THE BOOKING WHEN TIME IS PICKED ON DAILY SCHEDULE
      var booking;
      var valinnDagur;

      $scope.openBooking = function (t, b, date) {
        console.log("T: ", t);
        console.log("B: ", b);
        console.log("DATE: ", date);
        if (t === undefined) {
          console.log("UNDEFINED");
        } else {
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          booking = $scope.$new();
          var compiledDirective;
          $scope.clickOnTimapant = {
            nafn: b.name,
            staffId: b.person_id,
            date: dagatalFactory.dags(new Date(date)),
            startTime: dagatalFactory.dags(new Date(date), t),
            endTime: dagatalFactory.dags(new Date(date), '18:00')
          };
          compiledDirective = $compile('<boka class="skilabod" ' +
            'close="lokaBokun()" obj-from="clickOnTimapant"></boka>');
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
    }]);
})();
