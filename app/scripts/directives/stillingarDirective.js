(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', function() {
    	return {
        	templateUrl: '../../views/stillingar.html'
        };
    });
})();