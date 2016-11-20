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
          // When Creating or Updating PERSON (staff)
          scope.editUser = {};
          scope.editUser.role = 1;
          scope.editUser.company_id = backendFactory.ID();
          // CREATE SERVICE
          scope.service = {};
           // GET ALL STAFF AND SERVICE FOR SALOON
          scope.staff = [];
          //scope.services = [];
          scope.form = {};

          // COMPANY->_ID PERSON WORKS FOR

          // ADD PERSON AS STAFF IN COMPANY
          scope.addStaff = function(s) {
            if (scope.form.staffForm.$valid) {
              backendFactory.postPerson(s).then(function(res) {
                  scope.staff.push(res.data);
                  scope.state.add = false;
              }, function(err) {
                  console.log("ERROR stadfestaStaff(): ", err);
              });
            } else {
              scope.badInput = true;
            }
          };
          // END OF CREATING STAFF //

          // HELP FUNCTION WHEN CLICK EDIT STAFF,

          scope.editStaff = function (k, index) {
            if (k !== undefined) {
              scope.editUser = k;
              scope.state.add = !scope.state.add;
            } else {
              scope.state.add = !scope.state.add;
            }
          };

          scope.updateStaff = function() {
            backendFactory.updateStaff(scope.editUser).then(function(res) {
              console.log("UPDATE SUCCESSFULL", res);
            }, function(err) {
              console.log("UPDATE ERROR", err);
            });
          };

          scope.toggleView = function () {
            console.log("toggleView");
            scope.state.add = !scope.state.add;
            scope.badInput = false;
            scope.editUser = {};
            scope.editUser.role = 1;
            scope.editUser.company_id = backendFactory.ID();
          };

          // Varð að setja til að gera badinput false,
          // ekki hægt í html einhverra hluta vegna
          scope.badInputFalse = function () {
            scope.badInput = false;
          };

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

          function getStaff() {
              scope.staff = backendFactory.Staff();
          }

          function getService() {
              backendFactory.getService().then(function(res) {
                   scope.pricelist = res.data[0].pricelist;
                   backendFactory.setServiceID(res.data[0]._id);
              }, function(err) {
                  console.log("ERROR getService(): ", err);
              });
          }

          // GET DATA, NEED TO SHOW
          getStaff();
          getService();

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
          };

          // REMOVE/DELETE STAFF FROM STAFF IN COMPANY, REFERENCE->PERSON DOESN'T DELETE
          scope.removeStaff = function (a, index) {
            backendFactory.deleteFromStaff(a).then(function successCallback(response) {
                scope.staff.splice(index, 1);
            }, function errorCallback(error) {

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
