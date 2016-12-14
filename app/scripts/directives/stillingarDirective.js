(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('stillingar', ['gluggaService', 'dagatalFactory', 'backendFactory', function (gluggaService, dagatalFactory, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close'
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
          // Needed for validation
          scope.form = {};

          // TOGGLE BETWEEN PRICELIST AND STAFF also SHOWING ADDING FOR BOTH
          scope.state = {
            verdskra: false,
            add:      false,
            edit:     false
          };

          scope.toggle = function () {
            scope.state.verdskra = !scope.state.verdskra;
          };
          // END OF TOGGLE

          // HELP FUNCTION WHEN TOGGLE TO CREATING STAFF MEMBER
          scope.toStaffAdd = function () {
            scope.state.add =           !scope.state.add;
            scope.editUser =            {};
            scope.editUser.role =       1;
            scope.editUser.company_id = backendFactory.ID();
          };

          scope.tolfraedi = function () {
            gluggaService.init(scope);
            gluggaService.tolfraediGluggi();
          };

          // ADD PERSON AS STAFF IN COMPANY
          scope.addStaff = function (s) {
            if (scope.form.staffForm.$valid) {
              backendFactory.postPerson(s).then(function (res) {
                scope.staff.push(res.data);
                scope.state.add = false;
              }, function (err) {
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

          scope.updateStaff = function () {
            backendFactory.updateStaff(scope.editUser).then(function (res) {
            }, function (err) {
              console.log("UPDATE ERROR", err);
            });
          };

          scope.toggleStaffActive = function (ev) {
            console.log("toggleStaffActive: $event:", ev);
          };

          scope.toggleView = function () {
            scope.state.edit = false;
            scope.state.add =  false;
            scope.badInput =   false;
          };

          // Input validation
          scope.badInputFalse = function () {
            scope.badInput = false;
          };

          function getStaff() {
            scope.staff = backendFactory.Staff();
          }

          function getService() {
            backendFactory.getService().then(function (res) {
              scope.pricelist = res.data;
            }, function (err) {
              console.log("ERROR getService(): ", err);
            });
          }

          // GET DATA, NEED TO SHOW
          getStaff();
          getService();
          // END OF GETTING U/S

          // REMOVE/DELETE ITEM AND PRICE FROM SERVICES
          scope.removePrice = function () {
            backendFactory.deleteFromPricelist(scope.editVerd).then(function (res) {
              scope.pricelist.splice(scope.editVerd.index, 1);
              scope.state.edit = false;
            }, function (err) {
              console.log("ERROR removePrice", err);
            });
          };

          // !!! SEKJA BOKANIR FYRIR STARFSMANN FYRIR MANUDINN - TILRAUN !!!!
          scope.klikkaStarfsmann = function (p) {
            backendFactory.getBookingByMonth(p, dagatalFactory.getStringForDate()).then(function (res) {
            }, function (err) {
              console.log("update()->getBookingByMonth() ERR:", err);
            });
          };

          // HELP FUNCTION WHEN CLICK EDIT PRICE
          scope.editPrice = function (p, index) {
            scope.editVerd =             p;
            scope.editVerd.index =       index;
            scope.editVerd.timeLength /= 60;
            scope.state.edit =           true;
          };

          // HELP FUNCTION FOR ADD PRICE
          scope.toPriceAdd =  function () {
            scope.editVerd =  {};
            scope.state.add = true;
          };

          // MAKE CALL to ADD PRICE
          scope.addPrice = function (s) {
            if (scope.form.priceForm.$valid) {
              scope.state.add = false;
              s.timeLength *= 60;
              backendFactory.postService(s).then(function (res) {
                scope.pricelist.push(res.data);
                scope.badInput = false;
              }, function (err) {
                console.log("addUpdatePrice(add) -> postService(priceObj), err:", err);
              });
            } else {
              scope.badInput = true;
            }
          };

          // MAKE CALL TO UPDATE PRICE
          scope.updatePrice = function () {
            if (scope.form.priceForm.$valid) {
              scope.editVerd.timeLength *= 60;
              backendFactory.postService(scope.editVerd).then(function (res) {
                scope.pricelist.push(res.data);
              }, function (err) {
                console.log("postService() -> postService(priceObj), err:", err);
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
        }
      };
    }]);
})();
