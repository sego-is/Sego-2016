'use strict';

/**
 * @ngdoc function
 * @name segoEnnOgAfturApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the segoEnnOgAfturApp
 */
angular.module('segoApp')
  .controller('HomeCtrl', ['$scope', function ($scope) {
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
  }]);