(function() {
    'use strict';

    angular.module('segoapp')
      .controller('AdminCtrl', ['$scope', 'backendFactory', function ($scope, backendFactory) {
            $scope.editCompany = [];

            // Views on admin page
            $scope.show = "home";
            $scope.toggleViews = function (view) {
              $scope.show = view;
            };

            // HREINSA TIL I SERVICE //
            backendFactory.getAllService().then(function(res) {
                console.log('getAllService(), res.data:', res.data);
                $scope.service = res.data;
            }, function(err) {
                console.log('ERROR getAllService(), err:', err);
            });

            $scope.removeService = function(sid, index) {
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
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING ALL //

            // GET ALL USERS //
            backendFactory.getCustomerByCID().then(function (response) {
                $scope.users = response.data;
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
            // END GETTING ALL //

            // CREATING NEW COMPANY
            $scope.company = {};
            $scope.company.staff = [];

            backendFactory.getBook().then(function(res) {
                console.log('getBook success, res:', res);
            }, function(err) {
                console.log('getBook error, err:', err);
            });

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
            $scope.deleteUser = function(u, index) {
                backendFactory.deletePerson(u).then(function (response) {
                    $scope.users.splice(index, 1);
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

            $scope.removeIndex = function() {
                backendFactory.removeIndex().then(function(res) {
                    console.log("removeIndex()->TOKST, res:", res);
                }, function(err) {
                    console.log("removeIndex(), err:", err);
                })
            };

            $scope.ATHUGA = function(pid) {
                backendFactory.getCustomerStory().then(function(res) {
                    console.log("getCustomerStory() - THEE TOKSTS, res:", res);
                }, function(err) {
                    console.log("getCustomerStory() - ERROR, err:", err);
                });
            }

      }]);
})();
