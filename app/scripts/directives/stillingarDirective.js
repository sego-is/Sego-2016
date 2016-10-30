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
              backendFactory.postPerson(s);
          };
          // END OF CREATING HAIR.. //
          
          scope.staff;
          scope.service;
          
          getStaff();
          getService();
          
          function getStaff() {
              backendFactory.getStaff().then(function(res) {
                  scope.staff = res.data;
              }, function(err) {
                  console.log("ERROR getStaf(): ", err);
              });
          };
          
          function getService() {
              backendFactory.getService().then(function(res) {
                   scope.service = res.data;
              }, function(err) {
                  console.log("ERROR getService(): ", err);
              });
          };
         
          
            //
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
