(function() {

  'use strict';

  angular
    .module('segoapp')
    .directive('bidlisti', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/bidlisti.html',
        	link: function(scope, element, attrs) {
        		scope.closeWindow = function() {
        			scope.lokaGlugga();
        		};
        	}
        };
    });
})();
