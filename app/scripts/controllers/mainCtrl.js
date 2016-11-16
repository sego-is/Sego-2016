(function () {

  'use strict';

  /**
   * @ngdoc function
   * @name segoEnnOgAfturApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the segoEnnOgAfturApp
   */
  angular.module('segoApp')
    .controller('MainCtrl', ['$scope', '$compile', function ($scope, $compile) {
      var state = {
        'scope': 0,
        'openView': 0,
        'isOpen': false
      };

      $scope.gluggiOpinn = state.isOpen;

      $scope.valinnDagur = {
        'iDag': new Date()
      };

      $scope.waitingList = {};

      $scope.vidskiptavinir = {
        'addCustomer': false
      };

      $scope.lokaGlugga = function () {
        state.scope.$destroy();
        $('.skilaboda-haldari').empty();
        document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "hidden";
        state.isOpen = false;
        state.openView = 0;
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
      // TEMP TIL AD SYNA EKKI TMPaDMIN VIEW
      $scope.admin = false;
      
      $scope.opnaGlugga = function (gluggi) {
        if (!state.isOpen) {
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          state.scope = $scope.$new();
          var compiledDirective;
          switch (gluggi) {
            case "verdlisti":
              state.openView = gluggi;
              compiledDirective = $compile('<verdlisti class="skilabod" close="lokaGlugga()"></verdlisti>');
              break;
            case "stillingar":
             compiledDirective = $compile('<stillingar class="skilabod" close="lokaGlugga()"></stillingar>');
             
             // $scope.checkPass();
              //simple password protection
              /*compiledDirective = $compile('<div class="skilabod">' +
                '<input type="password" placeholder="Lykilorð" ng-model="p"> </input>' +
                '<button type="submit" ng-click="checkPass(p)">Áfram</button>' +
                '<button type="submit" ng-click="lokaGlugga()">Bakka</button>' +
                '</div>');*/
              break;
            case "vidskiptavinir":
              state.openView = gluggi;
              compiledDirective = $compile('<vidskiptavinir class="skilabod" close="lokaGlugga()"></vidskiptavinir>');
              break;
          }
          state.isOpen = true;
          var directiveElement = compiledDirective(state.scope);
          $('.skilaboda-haldari').append(directiveElement);
        } else {
            $scope.lokaGlugga();
        }
      };
    }]);
})();
