(function() {
    'use strict';

    angular.module('segoApp')
      .controller('AdminCtrl', ['$scope', 'backendFactory', function ($scope, backendFactory) {
            $scope.editCompany = [];
            
            // HREINSA TIL I SERVICE //
            backendFactory.getAllService().then(function(res) {
                console.log('getAllService(), res.data:', res.data);
                $scope.service = res.data;
            }, function(err) {
                console.log('ERROR getAllService(), err:', err);
            });
            
            $scope.deleteService = function(sid, index) {
                backendFactory.removeService(sid).then(function(res) {
                    $scope.service.splice(index, 1);
                }, function(err) {
                    console.log('ERROR deleteService(_id)->backendFactory.removeService(), err:', err);
                });
            };
            // HREINSA TIL I SERVICE, LOKID //
            
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
            backendFactory.getPersonsfromCID().then(function (response) {
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
            };
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
            //backendFactory.getBooking().then(function(res) {
            backendFactory.getBookingByCompany().then(function(res) {
                $scope.bookings = res.data;
                console.log("GET BOOKING ($scope.bookings): ", $scope.bookings);
            }, function(err) {
                console.log("GET BOOKING (err): ", err);
            });
            
            $scope.deleteBooking = function(bid, index) {
                backendFactory.deleteBookings(bid).then(function(res) {
                      $scope.bookings.splice(index, 1);
                      console.log("BOOKINGS FOR GIVEN DAY HAVE BEEN DELETED");
                }, function(err) {
                    console.log('ERROR deleteBooking:', err);
                }); 
            };
            
            $scope.toggleEditCompany = function(i) {
                console.log('toggleEditCompany', $scope.editCompany[i]);
                $scope.editCompany[i] = !$scope.editCompany[i];
            };
      }]);
})();
