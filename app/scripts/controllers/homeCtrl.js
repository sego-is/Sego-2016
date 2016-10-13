(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name segoEnnOgAfturApp.controller:AboutCtrl
     * @description
     * # AboutCtrl
     * Controller of the segoEnnOgAfturApp
     */
    angular.module('segoApp')
      .controller('HomeCtrl', ['$scope', 'dagatalFactory', function ($scope, dagatalFactory) {
        $scope.dagurinnIdag = dagatalFactory.dagsetning;
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
})();