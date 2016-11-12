(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('boka', ['backendFactory', function (backendFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close',
          objFrom: '=objFrom'

        },
        templateUrl: '../../views/boka.html',
        link: function (scope, element, attrs) {
          /*
            scope.bokun = {};

            scope.bokun.timi = scope.objFrom.timi;

            // kannski ad huga ad lengdinni hja mer seinna
            scope.bokun.klippari = scope.objFrom.nafn.name;
            scope.bokun.dags = scope.objFrom.dags;
            */
          console.log("DAGS ", scope.objFrom);

            scope.leave = function() {
                scope.close();
            };

            scope.stadfesta = function(bokun) {
                console.log("Bókun ", JSON.stringify(bokun));
                backendFactory.postBooking({
                    company_id: backendFactory.ID(),
                    startTime: scope.objFrom.startTime,
                    endTime: scope.objFrom.endTime,
                    staff_id: scope.objFrom.staffId,
                    customer_name:  scope.objFrom.customer,
                    customer_phone: scope.objFrom.phone,
                    customer_service: scope.objFrom.service,
                    date: scope.objFrom.date
                }).then(function(doc) {
                  console.log("CB scope.stafesta() - doc: ", doc);
                }, function (err) {
                  console.log("CB scope.stafesta() - err: ", err);

                });
            };

        }
      };
    }]);
})();
