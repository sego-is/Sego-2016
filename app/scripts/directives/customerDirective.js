(function () {

  'use strict';

  angular
    .module('segoApp')
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
              console.log("editCust ", c + " index: ", index);
              if (c !== undefined) {
                console.log("editCust if");
                  scope.person = c;
                  scope.modifyCus = !scope.modifyCus;
              }
              else {
                console.log("editCust else");
                  scope.modifyCus = !scope.modifyCus;
              }
          };

          scope.toggleCus = function() {
            console.log("toggleCus");
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
                console.log("bæta við nýjum viðskiptavin: ", scope.vidskiptavinir);
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
