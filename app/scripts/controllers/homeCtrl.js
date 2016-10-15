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

        $scope.openBooking = function () {
          console.log("bóka");
        };

        $scope.dagurinnIdag = dagatalFactory.dagsetning();
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
        $scope.bookings = [ {
          'time': '8:00',
          'name':'Einar'
        }, {
          'time': '9:00',
          'name':'Siggi'
        }, {
          'time': '10:00',
          'name':'Efro'
        }, {
          'time': '11:00',
          'name': 'Kaplo'
        }, {
          'time': '12:00',
          'name':'Ostaran'
        }, {
          'time': '13:00',
          'name': 'Mandalana'
        }];
        
        $scope.$on('breyta-dagsetningu', function(e, a) {
          $scope.dagurinnIdag = dagatalFactory.dagsetning();
        });
        /*
        $scope.$on('dagatal-breytast', function(e, a) {
          $scope.dags = dagatalFactory.dagatal;
          console.log('hmm breytast..');
        });
*/
      }]);
})();
