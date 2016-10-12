(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('verdlisti', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/verdlisti.html',
        	link: function(scope, element, attrs) {
        		scope.closeWindow = function() {
        			scope.lokaGlugga();
        		};
        	}
        };
    });
})();
