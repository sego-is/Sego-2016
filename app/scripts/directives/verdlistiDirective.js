(function() {

  'use strict';

  angular
    .module('segoapp')
    .directive('verdlisti', ['backendFactory', function(backendFactory) {
    	return {
    		restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/verdlisti.html',
        	link: function(scope) {
              backendFactory.getService().then(function(res) {
                  scope.pricelist = res.data;
                  console.log("PRICELIST", scope.pricelist);
              }, function(err) {
                  console.log("ERROR getStaf(): ", err);
              });
        		scope.closeWindow = function() {
        			scope.lokaGlugga();
        		};
        	}
        };
    }]);
})();
