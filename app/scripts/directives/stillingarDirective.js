(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', ['$http', 'backendFactory', function ($http, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          lokaGlugga: '&close'
        },
        templateUrl: '../../views/stillingar.html',
        link: function (scope, element, attrs) {

          // CREATE PERSON THAT WILL GET THE ROLE OF HAIRCUTTER OR DRESSER
          scope.person = {};
          scope.person.company_id = backendFactory.ID();
          scope.person.role = 1;

          scope.stadfestaStaff = function(s) {
              backendFactory.postPerson(s).then(function(res) {
                  console.log("PUSH-STAFF: ", res.data);
                  scope.staff.push(res.data);
              }, function(err) {
                  console.log("ERROR stadfestaStaff(): ", err);
              });
          };
          // END OF CREATING HAIR.. //

          // CREATING SERVICE
          scope.service = {};
          scope.service.company_id = backendFactory.ID();

          scope.stadfestaService = function(s) {
              backendFactory.postService(s).then(function(res) {
                  scope.pricelist.push(res.data);
              }, function(err) {
                  console.log("ERROR stadfestaService(): ", err);
              });
          };
          // END OF CREATE SERVICE

          // GET ALL STAFF AND SERVICE FOR SALOON
          scope.staff = [];
          //scope.services = [];

          getStaff();
          getService();

          function getStaff() {
              scope.staff = backendFactory.Staff();
          }

          function getService() {
              backendFactory.getService().then(function(res) {
                   scope.pricelist = res.data[0].pricelist;
                   console.log("pricelist", scope.pricelist);
              }, function(err) {
                  console.log("ERROR getService(): ", err);
              });
          }
         // END OF GETTING U/S


          scope.closeWindow = function () {
            scope.lokaGlugga();
          };



          scope.verdTrash = function (p, index) {
            backendFactory.deleteFromPricelist(p).then(function successCallback(response) {
                scope.pricelist.splice(index, 1);
             }, function errorCallback(error) {

             });
          };

          scope.edit = [];
          scope.breyta = function (i) {
            scope.edit[i] = !scope.edit[i];
          };

          scope.verdBreyting = function (p, index) {
            console.log("nytt verð ", JSON.stringify(p) + " i " + index);
            backendFactory.editPricelist(p).then(function successCallBack(response) {
              console.log("RESPONSE", response);
              //scope.pricelist[index] = p;
            }, function errorCallback(error) {

            });
          };

          scope.verdBreyting = function(v) {
              scope.editVerd = v;
              scope.state.edit = true;
          };

          scope.klippTrash = function (a, index) {
            backendFactory.deleteFromStaff(a).then(function successCallback(response) {
                scope.staff.splice(index, 1);
            }, function errorCallback(error) {

            });
          };

          scope.klippBreyting = function (k) {
            scope.editUser = k;
            scope.state.edit = true;
          };


          // TOGGLE BETWEEN PRICELIST AND STAFF also SHOWING ADDING FOR BOTH
          scope.state = {
              verdskra: false,
              add: false,
              edit: false
          };

          scope.toggle = function() {
              scope.state.verdskra = !scope.state.verdskra;
              scope.edit = [];
          };

          scope.add = function() {
              scope.state.add = !scope.state.add;
          };
          // END OF TOGGLE
        }
      };
    }]);
})();
