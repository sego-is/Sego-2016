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
    .controller('navbarCtrl', ['$scope', 'gluggaService', 'authService', function ($scope, gluggaService, authService) {

        $scope.lokaGlugga = function() {
            gluggaService.destroy();
        };

        $scope.vidskiptavinir = function() {
            gluggaService.init($scope);
            gluggaService.customerGluggi();
        };

        $scope.stillingar = function() {
            gluggaService.init($scope);
            gluggaService.stillingarGluggi($scope);
        };

        $scope.verdlisti = function() {
            gluggaService.init($scope);
            gluggaService.verdlistiGluggi($scope);
        };

/*
      $scope.checkPass = function (lykill) {
        var compiledDirective;
        if (1 === 1)/*(lykill === 'pass') {
          state.openView = 'stillingar';
          compiledDirective = $compile('<stillingar class="skilabod" close="lokaGlugga()"></stillingar>');
          state.isOpen = true;
          var directiveElement = compiledDirective(state.scope);
          $('.skilaboda-haldari').append(directiveElement);
        }else {
          $scope.lokaGlugga();
        }
      };
      */
      }]);
})();


