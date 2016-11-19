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

          // GET ALL CUSTOMERS FROM CID
          backendFactory.getCustomerByCID().then(function(res) {
              scope.vidskiptavinir = res.data;
          }, function(err) {
              console.log("customerDirective, getCustomerByCID() ERROR:", err);
              scope.vidskiptavinir = [];
          });

          // WHEN CREATING NEW PERSON
          scope.person = {};
          scope.person.company_id = backendFactory.ID();
          scope.person.role = 0;

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

          scope.toggleCus = function() {
              scope.modifyCus = !scope.modifyCus;
              scope.person = {};
          };

          scope.addCustomer = function (s) {
            console.log("bæta við nýjum viðskiptavin: ", s);
             backendFactory.postPerson(s).then(function (res) {
              scope.vidskiptavinir.push(res.data);
            }, function (err) {
              console.log("ERROR addCustomer(): ", err);
            });
          };

          scope.removeCustomer = function () {
            console.log("henda viðskiptavin");
          };
        }
      };
    }]);
})();
