(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('dagatal',['dagatalFactory', function(dagatalFactory) {
    	return {
        	restrict: 'E',
    		scope: {
    			dagsetning: '=iDag'
    		},
        	templateUrl: '../../views/dagatal.html',
        	link: function(scope, element, attrs) {

                scope.dagatal = dagatalFactory.dagatal();
                scope.dagar = [{
                    'short': 'sun',
                    'full': 'sunnudagur'
                },{
                    'short': 'mán',
                    'full': 'mánudagur'
                },{
                    'short': 'þri',
                    'full': 'þriðjudagur'
                },{
                    'short': 'mið',
                    'full': 'miðvikudagur'
                },{
                    'short': 'fim',
                    'full': 'fimmtudagur'
                },{
                    'short': 'fös',
                    'full': 'föstudagur'
                },{
                    'short': 'lau',
                    'full': 'laugardagur'
                }];   
        		scope.valinnDags = function(a) {
        			scope.dagsetning = new Date(a.year, a.month, a.day);
        		};
        	}
        };
    }]);
})();