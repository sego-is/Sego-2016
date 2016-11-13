(function() {
    'use strict';

    angular.module('segoApp')
      .controller('AdminCtrl', ['$scope', 'backendFactory', function ($scope, backendFactory) {
            $scope.editCompany = [];
            
            // GET ALL COMPANIES //
            backendFactory.getCompanies().then(function (response) {
                $scope.companies = response.data;
                var i;
                for (i = 0; i < $scope.companies.length; i++) {
                    $scope.editCompany.push(false);
                }
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
            $scope.company.staff = [];

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
               backendFactory.postPerson(p).then(function (response) {
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
            // END OF DELETE USER
            
            // GET ALL COLLECTIONS IN BOOKINGS
            backendFactory.getBooking().then(function(res) {
                $scope.bookings = res.data;
                console.log("GET BOOKING ($scope.bookings): ", $scope.bookings);  
            }, function(err) {
                console.log("GET BOOKING (err): ", err);
            });
            
            $scope.toggleEditCompany = function(i) {
                console.log('toggleEditCompany', $scope.editCompany[i]);
                $scope.editCompany[i] = !$scope.editCompany[i];
            };
      }]);
})();
