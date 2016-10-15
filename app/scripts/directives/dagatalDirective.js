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

                scope.dags = dagatalFactory.dagatal;

                scope.dagar = [{
                    'short': 'sun',
                    'full': 'Sunnudagur'
                },{
                    'short': 'mán',
                    'full': 'Mánudagur'
                },{
                    'short': 'þri',
                    'full': 'Þriðjudagur'
                },{
                    'short': 'mið',
                    'full': 'Miðvikudagur'
                },{
                    'short': 'fim',
                    'full': 'Fimmtudagur'
                },{
                    'short': 'fös',
                    'full': 'Föstudagur'
                },{
                    'short': 'lau',
                    'full': 'Laugardagur'
                }];
        		scope.btnVeljaDagsetningu = function(a) {
                    console.log(a);
                    dagatalFactory.breytaDagsetningu(a);
        			//scope.dagsetning = new Date(a.year, a.month, a.day);
        		};
        	}
        };
    }]);
})();
