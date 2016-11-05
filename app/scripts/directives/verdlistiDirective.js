(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('verdlisti', ['backendFactory', function(backendFactory) {
    	return {
    		restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/verdlisti.html',
        	link: function(scope, element, attrs) {
              backendFactory.getService().then(function(res) {
                  scope.pricelist = res.data[0].pricelist;
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
