(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('vidskiptavinir', function() {
    	return {
        	restrict: 'E',
    		scope: {
    			lokaGlugga: '&close'
    		},
        	templateUrl: '../../views/vidskiptavinir.html',
        	link: function(scope, element, attrs) {
        		scope.closeWindow = function() {
        			scope.lokaGlugga();
        		};
        	}
        };
    });
})();
