/**
 * Created by gudjo on 16.10.2016.
 */
(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name segoApp.controller:navbarCtrl
   * @description
   * # navbarCtrl til að birta alltaf navbar
   * Controller of the segoApp
   */
  angular.module('segoApp')
    .controller('navbarCtrl', ['$scope', 'authService', function ($scope, authService) {
        $scope.isLoggedIn - authService.auth();
        
      }]);
})();


