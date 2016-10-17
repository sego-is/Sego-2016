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

        		scope.addCustomer = function () {
              console.log("bæta við nýjum viðskiptavin");
            };

            scope.hendaVidskiptavin = function () {
              console.log("henda viðskiptavin");
            };

            scope.breytaVidskiptavin = function () {
              console.log("breyta viðskiptavin");
            };
        	}
        };
    });
})();
