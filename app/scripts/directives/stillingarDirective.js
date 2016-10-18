(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', function () {
      return {
        restrict: 'E',
        scope: {
          lokaGlugga: '&close'
        },
        templateUrl: '../../views/stillingar.html',
        link: function (scope, element, attrs) {
          scope.closeWindow = function () {
            scope.lokaGlugga();
          };

          scope.verdTrash = function () {
            console.log("Henda verði");
          };

          scope.verdBreyting = function () {
            console.log("breyta verði");
          };

          scope.klippTrash = function (a) {
            console.log("Henda klippara", a);
          };

          scope.klippBreyting = function () {
            console.log("breyta klippara");
          };
          
          scope.klipparar = [{
              'nafn': 'Einar Ormslev',
              'simi': 5692250
          },{
              'nafn': 'Sigurður Þór Árnason',
              'simi': 6650204
          },{
              'nafn': 'Guðríður Stefánsdóttir',
              'simi': 6985455
          },{
              'nafn': 'Kaplo',
              'simi': 7726254
          }];
          
          scope.stillingar = {
            klipp: true,
            verd: false,
            addKlippara: false,
            addVerd: false
          };

          scope.toggleKlippara = function () {
            if(scope.stillingar.verd) {
              scope.stillingar.klipp = !scope.stillingar.klipp;
              scope.stillingar.verd = !scope.stillingar.verd;
              scope.stillingar.addKlippara = false;
            } else {
              scope.stillingar.addKlippara = !scope.stillingar.addKlippara;
            }
          };

          scope.toggleVerdskra = function () {
            if(scope.stillingar.klipp) {
              scope.stillingar.verd = !scope.stillingar.verd;
              scope.stillingar.klipp = !scope.stillingar.klipp;
              scope.stillingar.addVerd = false;
            } else {
              scope.stillingar.addVerd = !scope.stillingar.addVerd;
            }
          }
        }
      };
    });
})();
