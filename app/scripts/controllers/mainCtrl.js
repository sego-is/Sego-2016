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

      $('[data-toggle="tooltip"]').tooltip();

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

      $scope.opnaGlugga = function (gluggi) {
        if (!state.isOpen || state.openView !== gluggi) {
          if(state.openView !==  gluggi && state.isOpen) {
            $scope.lokaGlugga();
          }
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          state.scope = $scope.$new();
          var compiledDirective;
          switch (gluggi) {
            case "verdlisti":
              state.openView = gluggi;
              compiledDirective = $compile('<verdlisti class="skilabod" close="lokaGlugga()"></verdlisti>');
              break;
            case "stillingar":
              console.log("STILLINGAR :D");
              state.openView = gluggi;
              compiledDirective = $compile('<stillingar class="skilabod" close="lokaGlugga()"></stillingar>');
              break;
            case "vidskiptavinir":
              state.openView = gluggi;
              compiledDirective = $compile('<vidskiptavinir class="skilabod" close="lokaGlugga()"></vidskiptavinir>');
              break;
          }
          state.isOpen = true;
          var directiveElement = compiledDirective(state.scope);
          $('.skilaboda-haldari').append(directiveElement);
        } else if (state.openView === gluggi) {
          $scope.lokaGlugga();
        }
      };
    }]);
})();
