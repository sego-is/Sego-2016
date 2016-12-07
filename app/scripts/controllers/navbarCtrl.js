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
  angular.module('segoapp')
    .controller('navbarCtrl', ['$scope', 'authService', function ($scope, authService) {
        $scope.isLoggedIn - authService.auth();
        
        $scope.isAdmin = function() {
            var p = JSON.parse(localStorage.getItem('profile'));
            if (p.app_metadata.user !== undefined) {
                return p.app_metadata.user[0] === "admin";
            }
            else {
                return false;    
            }
                    
        };
        
      }]);
})();


