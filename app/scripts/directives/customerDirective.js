(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('customer', ['$compile', 'backendFactory', function ($compile, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close'
        },
        templateUrl: '../../views/customer.html',
        link: function (scope, element, attrs) {
          // GET ALL CUSTOMERS FROM CID
          backendFactory.getCustomerByCID().then(function (res) {
            scope.vidskiptavinir = res.data;
          }, function (err) {
            console.log("customerDirective, getCustomerByCID() ERROR:", err);
            scope.vidskiptavinir = [];
          });

          // WHEN CREATING NEW PERSON
          scope.person = {};

          scope.vidskiptavinir = [];
          scope.form = {};

          scope.modifyCus = false;
          scope.tmpModifyCus = false;

          scope.temp = function () {
            scope.tmpModifyCus = !scope.tmpModifyCus;
          };

          scope.editCust = function (c) {
            if (c !== undefined) {
              scope.person =    c;
            }
            scope.modifyCus = !scope.modifyCus;
            scope.newCustomer = false;
          };

          scope.returnStaff = function (pid) {
            return backendFactory.getStaffById(pid);
          };

          scope.totalPrice = [];

          scope.returnService = function (sid, index) {
            if (scope.totalPrice[index] === undefined) {
              scope.totalPrice[index] = 0;
            }
            var tmp = backendFactory.getServiceById(sid);
            scope.totalPrice[index] = scope.totalPrice[index] + tmp.price;
            return tmp.name;
          };

          scope.newCus = function () {
            scope.modifyCus =   false;
            scope.newCustomer = true;
            scope.badInput =    false;
            scope.person =      {};
          };

          scope.toggleCus = function () {
             if(!scope.modifyCus) {
                 scope.newCustomer = false;
             }
             else {
                 scope.modifyCus = false;
             }
            //scope.newCustomer = !scope.newCustomer;
          };

          // Fyrir input validation
          scope.badInputFalse = function () {
            scope.badInput = false;
          };

          scope.addCustomer = function (s) {
            if (scope.form.customerForm.$valid) {
              s.company_id = backendFactory.ID();
              s.role =       0;
              backendFactory.postPerson(s).then(function (res) {
                scope.vidskiptavinir.push(res.data);
                scope.newCustomer = !scope.newCustomer;
                //scope.lokaGlugga();
              }, function (err) {
                console.log("ERROR addCustomer(): ", err);
              });
            } else {
              scope.badInput = true;
            }
          };

          scope.removeCustomer = function () {
            console.log("henda viðskiptavin");
          };

          scope.toMMDDYY = function (d) {
            var tmpDate =  new Date(d);
            var tmpMonth = tmpDate.getMonth() + 1;
            return (tmpMonth + '-' + tmpDate.getDate() + '-' + tmpDate.getFullYear());
          };
        }
      };
    }]);
})();
