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
                
                scope.vidskiptavinir = [{
                    'nafn': 'Hillary Clinton',
                    'simi': '9112119',
                    'netfang': 'Hillary@lewinsky.com',
                    'heimilisfang': 'Bandaríkin 16',
                    'Athugasemdir' : [ 'Vill verða forseti']
                },{
                    'nafn': 'Arnfinnur Geirsson',
                    'simi': '5684715',
                    'netfang': 'finnur@gmail.com',
                    'heimilisfang': 'Brávallargata 7',
                    'Athugasemdir' : ['Vill láta gæla við sig meðan á klippingu stendur',
                        'Mikill áhugamaður um uppstopun á grænmeti og ávöxtum']
                }];
                
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
