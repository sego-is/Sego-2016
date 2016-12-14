(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name segoEnnOgAfturApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the segoEnnOgAfturApp
   */
  angular.module('segoapp')
    .controller('DatepickerCtrl', ['$scope', function ($scope) {
      $scope.isNavCollapsed = true;
      $scope.isCollapsed = false;
      $scope.isCollapsedHorizontal = false;
      $scope.today = function () {
        $scope.dt = new Date();
        $scope.$emit('dagsetning', $scope.dt);
      };

      $scope.today();
      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      // Disable weekend selection
      function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      }

      $scope.toggleMin = function () {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
      };

      $scope.toggleMin();

      $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
        $scope.$emit('dagsetning', $scope.dt);
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date(tomorrow);
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      function getDayClass(data) {

        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      }
    }]);

})();
