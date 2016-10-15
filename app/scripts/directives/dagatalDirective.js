(function() {

  'use strict';

  angular
    .module('segoApp')
    .directive('dagatal',['dagatalFactory', '$rootScope', function(dagatalFactory, $rootScope) {
    	return {
        	restrict: 'E',
    		scope: {
    			dagsetning: '=iDag'
    		},
        	templateUrl: '../../views/dagatal.html',
        	link: function(scope, element, attrs) {

                scope.dags = dagatalFactory.dagatal;

                scope.stillingar = {
                    'ar': dagatalFactory.getAr(),
                    'man': dagatalFactory.getMan(),
                    'dags': dagatalFactory.getDags()

                };

                scope.dagar = [{
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
                    'full': 'laugardagur'
                },{
                    'short': 'sun',
                    'full': 'sunnudagur'
                }];

                function changeMonth(a) {
                    dagatalFactory.breytaMan(a);
                    dagatalFactory.uppfaera();
                    scope.dags = dagatalFactory.dagatal;
                };

        		scope.btnVeljaDagsetningu = function(a, b) {
                    if (b === 0) {
                        if (a > 7) {
                            changeMonth(-1);
                        }
                    }
                    if (b === 5) {
                        if (a < 8) {
                            changeMonth(1);
                        }
                    }
                    dagatalFactory.breytaDagsetningu(a);
                    $rootScope.$broadcast('breyta-dagsetningu');
                };
        	}
        };
    }]);
})();
