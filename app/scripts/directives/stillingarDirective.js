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
          // Needed for validation
          scope.form = {};

          // COMPANY->_ID PERSON WORKS FOR

          // HELP FUNCTION WHEN TOGGLE TO CREATING STAFF MEMBER
          scope.toStaffAdd = function() {
            scope.state.add =  !scope.state.add;
            scope.editUser = {};
            scope.editUser.role = 1;
            scope.editUser.company_id = backendFactory.ID();
          };

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
          scope.editStaff = function (k) {
            if (k !== undefined) {
              scope.editUser = k;
            }
            scope.state.edit = !scope.state.edit;
          };

          scope.updateStaff = function() {
            backendFactory.updateStaff(scope.editUser).then(function(res) {
              console.log("UPDATE SUCCESSFULL", res);
            }, function(err) {
              console.log("UPDATE ERROR", err);
            });
          };

          scope.toggleView = function () {
            scope.state.edit = false;
            scope.state.add = false;
            scope.badInput = false;
          };

          // Varð að setja til að gera badinput false,
          // ekki hægt í html einhverra hluta vegna
          scope.badInputFalse = function () {
            scope.badInput = false;
          };

          // GET DATA, NEED TO SHOW
          getStaff();
          getService();

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

          // HELP FUNCTION FOR ADD PRICE
          scope.toPriceAdd = function() {
            scope.editVerd = {};
             scope.state.add = true;
          };

          // MAKE CALL to ADD PRICE
          scope.addPrice = function(s) {
            if (scope.form.priceForm.$valid) {
              console.log("FORM VALID 1", s);
              console.log("FORM VALID 2", scope.editVerd);
              backendFactory.postService(scope.editVerd).then(function(res) {
                console.log("POSTED ", res);
                scope.pricelist.push(res.data);
                scope.state.add = false;
                scope.badInput = false;
              }, function(err) {
                console.log("addUpdatePrice(add) -> postService(priceObj), err:", err);
              });
            } else {
              scope.badInput = true;
            }
          };

          // MAKE CALL TO UPDATE PRICE
          scope.updatePrice = function() {
            if (scope.form.priceForm.$valid) {
              console.log("updatePrice() data", scope.editVerd);
              backendFactory.updatePricelist(scope.editVerd).then(function (res) {
                // CLOSE EDIT/ADD VIEW
                scope.state.edit = false;
                scope.badInput = false;
                scope.editVerd = {};
              }, function (err) {
                console.log("addUpdatePrice(edit) -> updatePricelist(priceObj), err:", err);
              });
            } else {
              scope.badInput = true;
            }
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
          };
          // END OF TOGGLE
        }
      };
    }]);
})();
