(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('customer', ['$compile', 'backendFactory', function ($compile, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          lokaGlugga: '&close'
        },
        templateUrl: '../../views/customer.html',
        link: function (scope, element, attrs) {
          console.log("SCOPE: ", scope.data);

          // GET ALL CUSTOMERS FROM CID
          backendFactory.getCustomerByCID().then(function(res) {
              scope.vidskiptavinir = res.data;
              console.log("vidskiptavinir:", scope.vidskiptavinir);
          }, function(err) {
              console.log("customerDirective, getCustomerByCID() ERROR:", err);
              scope.vidskiptavinir = [];
          });

          // WHEN CREATING NEW PERSON
          scope.person = {};


          scope.vidskiptavinir = [];
          scope.form = {};

          // TO CLOSE THIS VIEW
          scope.closeWindow = function () {
            scope.lokaGlugga();
          };


          // WHEN

          scope.modifyCus = false;

          scope.editCust = function(c, index) {
              if (c !== undefined) {
                  scope.person = c;
                  scope.modifyCus = !scope.modifyCus;
              }
              else {
                  scope.modifyCus = !scope.modifyCus;
              }
          };
          
          scope.returnStaff = function(pid) {
                return backendFactory.getStaffById(pid);
          };
          
          scope.totalPrice = [];

          scope.returnService = function(sid, index) {
              if (scope.totalPrice[index] === undefined) {
                scope.totalPrice[index] = 0;
              }  
              var tmp = backendFactory.getServiceById(sid);
              scope.totalPrice[index]   = scope.totalPrice[index] + tmp.price;
              return tmp.name;
          };
          
          scope.toggleCus = function() {
              scope.modifyCus = !scope.modifyCus;
              scope.badInput = false;
              scope.person = {};
          };

          // Varð að setja til að gera badinput false,
          // ekki hægt í html einhverra hluta vegna
          scope.badInputFalse = function () {
            scope.badInput = false;
          };

          scope.addCustomer = function (s) {
            //console.log("bæta við nýjum viðskiptavin: ", s);
            if(scope.form.customerForm.$valid) {
                s.company_id = backendFactory.ID();
                s.role = 0;
                backendFactory.postPerson(s).then(function (res) {
                    scope.vidskiptavinir.push(res.data);
                }, function (err) {
                    console.log("ERROR addCustomer(): ", err);
              });
            } else {
              console.log("BAD INPUT");
              scope.badInput = true;
            }
          };

          scope.removeCustomer = function () {
            console.log("henda viðskiptavin");
          };
        }
      };
    }]);
})();
