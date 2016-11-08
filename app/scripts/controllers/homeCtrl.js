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
      
      // GO TO PREVIOUS OR NEXT DAY
      $scope.prev = function() {
          $scope.dagurinnIdag = dagatalFactory.iGaer();
      };

      $scope.next = function() {
          $scope.dagurinnIdag = dagatalFactory.aMorgun();
      };

  
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
    }]);
})();
