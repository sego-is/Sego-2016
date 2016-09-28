'use strict'

angular.module('sego').controller('DailyBookingCtrl', ['$scope', function ($scope) {
    $scope.open = function() {
      console.log("rassgat");
    };
    const start_time = 7, end_time = 23;

    $scope.names = [ { 
    	'id':1,
    	'name':'Einar' 
    }, { 
    	'id':2,
    	'name':'Siggi'
    }, { 
    	'id':3,
    	'name':'Efro' 
    }, { 
    	'id':4,
    	'name': 'Kaplo' 
    }, { 
    	'id':5,
    	'name':'Ostaran' 
    }, { 
    	'id':6,
    	'name': 'Mandalana' 
    }];
    $scope.booking = [];
}])
.directive('openSettings', function() {
	return {
        restrict: 'E',
        templateUrl: 'views/settings.html',
        transclude: true,
        scope: {
            userInfo: '=info',
            closeSettings: '&onQuit'
        },
        link: function(scope, element, attrs) {
           
        }
     };
});