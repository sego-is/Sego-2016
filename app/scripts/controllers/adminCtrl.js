(function() {
    'use strict';

    angular.module('segoApp')
      .controller('AdminCtrl', ['$scope', 'backendFactory', function ($scope, backendFactory) {
            var profile = JSON.parse(localStorage.getItem('profile'));
            
            // GET ALL COMPANIES //
            backendFactory.getCompanies().then(function (response) {
                $scope.companies = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING ALL //

            // GET ALL USERS //
            backendFactory.getPersons().then(function (response) {
                $scope.users = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING ALL //

            // CREATING NEW COMPANY
            $scope.company = {};
            $scope.company.auth_id = profile.user_id;

            $scope.addCompany = function(c) {
                backendFactory.postCompany(c).then(function (response) {
                    console.log("RESPONSE:", response);
                }).catch(function(err) {
                    console.log("ERROR", JSON.stringify(err));
                }).finally(function() {} );
            }
            // END CREATING COMPANY

            // CREATING NEW USER
            $scope.user = {};

            $scope.addUser = function(u) {
               backendFactory.postPerson.then(function (response) {
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            };

            // END CREATING USER

            //DELETE USER
            $scope.deleteUser = function(u) {
                console.log("DELETE USER ", u);
                backendFactory.deletePerson(u).then(function (response) {
                    console.log("ARRAY OF USERS ", $scope.users);
                    console.log("RESPONSE:", response);
                }).catch(function(err) {
                    console.log("ERROR", JSON.stringify(err));
                }).finally(function() {} );
            };
      }]);
})();
