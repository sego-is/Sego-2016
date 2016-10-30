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
            scope.bokun.klippari = scope.objFrom.nafn.name;
            
            scope.leave = function() {
                scope.close();  
            };
            
            scope.stadfesta = function() {
                var p = JSON.parse(localStorage.getItem('profile'));
                backendFactory.postRass({
                    user_id: p.user_id,
                    company_id: p.company_id,
                    time: new Date(scope.objFrom.dags),
                    klippari: scope.bokun.klippari
                }, function(a) {
                    
                });
            };
            
        }
      };
    }]);
})();
