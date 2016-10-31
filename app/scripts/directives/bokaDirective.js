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
            scope.bokun = {};
            
            scope.bokun.timi = scope.objFrom.timi;
            // kannski ad huga ad lengdinni hja mer seinna
            scope.bokun.klippari = scope.objFrom.nafn.id;
            
            scope.leave = function() {
                scope.close();  
            };
            
            scope.stadfesta = function() {
                var p = JSON.parse(localStorage.getItem('profile'));
                backendFactory.postBooking({
                    user_id: p.user_id,
                    company_id: p.company_id,
                    time: new Date(scope.objFrom.dags),
                    staff_id: scope.bokun.klippari,
                    customer_name:  scope.bokun.customer,
                    customer_simi: scope.bokun.simi
                }, function(err, doc) {
                    if (err) {
                        console.log("CB scope.stafesta() - err: ", err);    
                    }
                    else {
                        console.log("CB scope.stafesta() - doc: ", doc);
                    }
                   
                });
            };
            
        }
      };
    }]);
})();
