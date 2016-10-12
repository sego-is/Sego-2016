(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', function() {
    	return {
        	restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/stillingar.html',
        	link: function(scope, element, attrs) {
        		scope.closeWindow = function() {
        			scope.lokaGlugga();
        		};
        	}
        };
    });
})();