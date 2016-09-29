'use strict';

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
.directive('openOwner', function() {
	return {
        restrict: 'E',
        templateUrl: 'src/HTML/ownerView.html',
        transclude: true,
        scope: false,
     };
});