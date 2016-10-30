(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', ['$http','backendFactory', function ($http, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          lokaGlugga: '&close'
        },
        templateUrl: '../../views/stillingar.html',
        link: function (scope, element, attrs) {
            
            //  CREATE PERSON THAT WILL GET THE ROLE OF HAIRCUTTER OR DRESSER
          scope.person = {};
          scope.person.company_id = backendFactory.getID();
          scope.person.role = 1;
          
          scope.stadfestaStaff = function(s) {
              $http({
                url: 'http://wwww.sego.is:6969/api/persons',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: s
            }).then(function (response) {
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
          };
          // END OF CREATING HAIR.. //
          
          // GET HAIRDRESSER FOR SALOON //
          $http({
                url: 'http://wwww.sego.is:6969/api/persons/',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                params: {
                    company_id: backendFactory.getID()
                }
            }).then(function (response) {
                scope.staff = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING HAIRDRESSERS FROM SALOON

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
          
          // TOGGLE BETWEEN PRICELIST AND STAFF also SHOWING ADDING FOR BOTH
          scope.state = {
              verdskra: false,
              add: false
          };
          
          scope.toggle = function() {
              scope.state.verdskra = !scope.state.verdskra;
          };
          
          scope.add = function() {
              scope.state.add = !scope.state.add;
          }
          // END OF TOGGLE
        }
      };
    }]);
})();
