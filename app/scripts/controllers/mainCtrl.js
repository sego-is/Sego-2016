(function() {

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
    const state = {};
    $scope.gluggiOpinn = false;

    $scope.waitingList = {};

    /*
      Would be better to include this in stillingar directive
    */
    $scope.stillingar = {
      'addKlippara': false,
    	'admin': false
    };
    $scope.toggleKlippara = function() {
      $scope.stillingar.addKlippara = !$scope.stillingar.addKlippara;
    };
    /* END  ST*/
    $scope.vidskiptavinir = {
      'addCustomer': false
    };

    $scope.ownerView = {
    	'pass': 'rasstippibrjosthommi'
    };

    let verdlistiOpinn = false;
    let btnStillingar = false;
    let btnVidskiptavinir = false;

    $scope.btnVerdlisti = function() {
      if (!$scope.gluggiOpinn || btnStillingar || btnVidskiptavinir) {
        btnStillingar = false;
        btnVidskiptavinir = false;
        state.scope = $scope.$new();
        var compiledDirective = $compile('<verdlisti class="skilabod"></verdlisti>');
        var directiveElement = compiledDirective(state.scope);
        $('.skilaboda-haldari').append(directiveElement);
        $scope.gluggiOpinn = true;
        verdlistiOpinn = true;
        console.log("verðlisti " + verdlistiOpinn + " stillingar " + btnStillingar + " viðskiptavinir " + btnVidskiptavinir);
      }
      else {
        state.scope.$destroy();
        $('.skilaboda-haldari').empty();
        $scope.gluggiOpinn = false;
        verdlistiOpinn = false;
        console.log("verðlisti " + verdlistiOpinn + " stillingar " + btnStillingar + " viðskiptavinir " + btnVidskiptavinir);
      }
    };

    $scope.btnStillingar = function() {
      if (!$scope.gluggiOpinn || verdlistiOpinn || btnVidskiptavinir) {
        verdlistiOpinn = false;
        btnVidskiptavinir = false;
        state.scope = $scope.$new();
        var compiledDirective = $compile('<stillingar class="skilabod"></stillingar>');
        var directiveElement = compiledDirective(state.scope);
        $('.skilaboda-haldari').append(directiveElement);
        $scope.gluggiOpinn = true;
        btnStillingar = true;
      }
      else {
        state.scope.$destroy();
        $('.skilaboda-haldari').empty();
        $scope.gluggiOpinn = false;
        btnStillingar = false;
      }
    };

    $scope.btnVidskiptavinir = function() {
      if (!$scope.gluggiOpinn || btnStillingar || verdlistiOpinn) {
        verdlistiOpinn = false;
        btnStillingar = false;
        state.scope = $scope.$new();
        var compiledDirective = $compile('<vidskiptavinir class="skilabod"></vidskiptavinir>');
        var directiveElement = compiledDirective(state.scope);
        $('.skilaboda-haldari').append(directiveElement);
        $scope.gluggiOpinn = true;
        btnVidskiptavinir = true;
      }
      else {
        state.scope.$destroy();
        $('.skilaboda-haldari').empty();
        $scope.gluggiOpinn = false;
        btnVidskiptavinir = false;
      }
    };

  }]);
})();
