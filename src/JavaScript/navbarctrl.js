'use strict'

angular.module('sego').controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.showOwner = 0;
	$scope.templateURL = 'src/HTML/ownerView.html';
	$scope.openOwner = function() {
		if ($scope.showOwner === 0) {
			$scope.showOwner = 1;
		}
		else {
			$scope.showOwner = 0
		}

	};
}]);