(function() {
    'use strict';
    
    angular.module('segoApp')
      .controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {
            var profile = JSON.parse(localStorage.getItem('profile'));
            $scope.company = {};
            $scope.company.auth_id = profile.user_id;
            
            $scope.stadfesta = function(c) {
                $http({
                url: 'http://wwww.sego.is:6969/api/companies',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: c
            }).then(function (response) {
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            }
      }]);
})();