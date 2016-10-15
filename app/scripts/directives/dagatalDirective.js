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
                },{
                    'short': 'sun',
                    'full': 'sunnudagur'
                }];

                scope.$on('dagatal-breytast', function(e, a) {
                    scope.dags = dagatalFactory.dagatal;
                    console.log('hmm breytast..');
                });

        		scope.btnVeljaDagsetningu = function(a, b) {
                    if (b === 0) {
                        if (a > 7) {
                            dagatalFactory.breytaMan(-1);
                        }
                    }
                    if (b === 5) {
                        if (a < 8) {
                            dagatalFactory.breytaMan(1);
                        }
                    }
                    dagatalFactory.breytaDagsetningu(a);
        		};
        	}
        };
    }]);
})();