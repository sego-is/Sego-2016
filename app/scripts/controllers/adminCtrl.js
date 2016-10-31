(function() {
    'use strict';

    angular.module('segoApp')
      .controller('AdminCtrl', ['$scope', '$http', function ($scope, $http) {
            var profile = JSON.parse(localStorage.getItem('profile'));
            // GET ALL COMPANIES //

            $http({
                url: 'http://wwww.sego.is:6969/api/companies',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                }
            }).then(function (response) {
                $scope.companies = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );

            // END GETTING ALL //

            // GET ALL USERS //
            $http({
                url: 'http://wwww.sego.is:6969/api/persons',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                }
            }).then(function (response) {
                $scope.users = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING ALL //

            // WHEN CREATING NEW COMPANY
            $scope.company = {};
            $scope.company.auth_id = profile.user_id;

            $scope.addCompany = function(c) {
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
            // END CREATING COMPANY

            // WHEN CREATING NEW USER
            $scope.user = {};

            $scope.addUser = function(u) {
                $http({
                url: 'http://wwww.sego.is:6969/api/persons',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: u
            }).then(function (response) {
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            };

            // END CREATING USER

            //DELETE USER
        $scope.deleteUser = function(u) {
          console.log("DELETE USER ", u);
          $http({
            url: 'http://wwww.sego.is:6969/api/persons:' + u,
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            },
            data: u
          }).then(function (response) {
            console.log("ARRAY OF USERS ", $scope.users);
            console.log("RESPONSE:", response);
          }).catch(function(err) {
            console.log("ERROR", JSON.stringify(err));
          }).finally(function() {} );
        };
      }]);
})();
