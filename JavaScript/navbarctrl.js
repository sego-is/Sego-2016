'use strict';

angular.module('sego').controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.openSettings = function() {
		console.log("settings");
		$scope.templateURL = 'settings.html';
	};
}]);