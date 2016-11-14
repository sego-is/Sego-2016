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
          // scope Variables
          // CREATE PERSON 
          scope.person = {};
          // CREATE SERVICE
          scope.service = {};
           // GET ALL STAFF AND SERVICE FOR SALOON
          scope.staff = [];
          //scope.services = [];
          
          
          // COMPANY->_ID PERSON WORKS FOR
          scope.person.company_id = backendFactory.ID();
          // PERSONE WILL GET ROLE OF STAFF : 1
          scope.person.role = 1;
          // ADD PERSON AS STAFF IN COMPANY
          scope.addStaff = function(s) {
              backendFactory.postPerson(s).then(function(res) {
                  scope.staff.push(res.data);
                  scope.state.add = false;
              }, function(err) {
                  console.log("ERROR stadfestaStaff(): ", err);
              });
          };
          // END OF CREATING STAFF //

          
          //  COMPANY->_ID OWN SERVICE 
          scope.service.company_id = backendFactory.ID();

          scope.addPrice = function(s) {
              backendFactory.postService(s).then(function(res) {
                  scope.pricelist.push(res.data);
                  scope.state.add = false;
              }, function(err) {
                  console.log("ERROR stadfestaPrice(): ", err);
              });
          };
          // END OF CREATE SERVICE

          // GET DATA, NEED TO SHOW
          getStaff();
          getService();

          function getStaff() {
              scope.staff = backendFactory.Staff();
          };

          function getService() {
              backendFactory.getService().then(function(res) {
                   scope.pricelist = res.data[0].pricelist;
                   backendFactory.setServiceID(res.data[0]._id);
              }, function(err) {
                  console.log("ERROR getService(): ", err);
              });
          }
         // END OF GETTING U/S

         // LOKA GLUGGANUM A STILLINGAR VIEW-INU
          scope.closeWindow = function () {
            scope.lokaGlugga();
          };

          // REMOVE/DELETE ITEM AND PRICE FROM SERVICES
          scope.removePrice = function (p, index) {
            backendFactory.deleteFromPricelist(p).then(function successCallback(response) {
                scope.pricelist.splice(index, 1);
             }, function errorCallback(error) {

             });
          };
          
          // HELP FUNCTION WHEN CLICK EDIT PRICE
          scope.editPrice = function (p) {
            scope.editVerd = p;
            scope.state.edit = true;
          };
          // UPDATE PRICE PUT:CALL
          scope.updatePrice = function() {
              backendFactory.updatePricelist(scope.editVerd).then(function successCallBack(response) {
                // CLOSE EDIT VIEW
                scope.state.edit = false;
            }, function errorCallback(error) {
                    console.log("ERRROR", error);
            });
          }
          
          // REMOVE/DELETE STAFF FROM STAFF IN COMPANY, REFERENCE->PERSON DOESN'T DELETE
          scope.removeStaff = function (a, index) {
            backendFactory.deleteFromStaff(a).then(function successCallback(response) {
                scope.staff.splice(index, 1);
            }, function errorCallback(error) {

            });
          };
          // HELP FUNCTION WHEN CLICK EDIT STAFF,
          scope.editStaff = function (k, index) {
            scope.editUser = k;
            scope.state.edit = true;
          };
          
          scope.updateStaff = function() {
              backendFactory.updateStaff(scope.editUser).then(function(res) {
                  console.log("UPDATE SUCCESSFULL", res);
              }, function(err) {
                  console.log("UPDATE ERROR", err);
              });
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
