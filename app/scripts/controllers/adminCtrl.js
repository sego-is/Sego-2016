(function () {
  'use strict';

  angular.module('segoapp')
    .controller('AdminCtrl', ['$scope', 'adminFactory', function ($scope, adminFactory) {
      $scope.editCompany = [];

      // Views on admin page
      $scope.show = "home";
      $scope.toggleViews = function (view) {
        $scope.show = view;
      };

      // HREINSA TIL I SERVICE //
      adminFactory.getAllService().then(function (res) {
        console.log('getAllService(), res.data:', res.data);
        $scope.service = res.data;
      }, function (err) {
        console.log('ERROR getAllService(), err:', err);
      });

      $scope.removeService = function (sid, index) {
        adminFactory.removeService(sid).then(function (res) {
          $scope.service.splice(index, 1);
        }, function (err) {
          console.log('ERROR deleteService(_id)->adminFactory.removeService(), err:', err);
        });
      };
      // HREINSA TIL I SERVICE, LOKID //

      // GET ALL COMPANIES //
      adminFactory.getCompanies().then(function (response) {
        $scope.companies = response.data;
        console.log("RESPONSE:", response);
      }).catch(function (err) {
        console.log("ERROR", JSON.stringify(err));
      }).finally(function () {
      });
      // END GETTING ALL //

      // GET ALL USERS //
      adminFactory.getCustomerByCID().then(function (response) {
        $scope.users = response.data;
        console.log("RESPONSE:", response);
      }).catch(function (err) {
        console.log("ERROR", JSON.stringify(err));
      }).finally(function () {
      });
      // END GETTING ALL //

      // CREATING NEW COMPANY
      $scope.company =       {};
      $scope.company.staff = [];

      adminFactory.getBook().then(function (res) {
        console.log('getBook success, res:', res);
      }, function (err) {
        console.log('getBook error, err:', err);
      });

      $scope.addCompany = function (c) {
        adminFactory.postCompany(c).then(function (response) {
          console.log("RESPONSE:", response);
        }).catch(function (err) {
          console.log("ERROR", JSON.stringify(err));
        }).finally(function () {
        });
      };
      // END CREATING COMPANY

      // CREATING NEW USER
      $scope.user = {};

      $scope.addUser = function (u) {
        adminFactory.postPerson(p).then(function (response) {
          console.log("RESPONSE:", response);
        }).catch(function (err) {
          console.log("ERROR", JSON.stringify(err));
        }).finally(function () {
        });
      };
      // END CREATING USER

      //DELETE USER
      $scope.deleteUser = function (u, index) {
        adminFactory.deletePerson(u).then(function (response) {
          $scope.users.splice(index, 1);
        }).catch(function (err) {
          console.log("ERROR", JSON.stringify(err));
        }).finally(function () {
        });
      };
      // END OF DELETE USER

      // GET ALL COLLECTIONS IN BOOKINGS
      //backendFactory.getBooking().then(function(res) {
      adminFactory.getBookingByCompany().then(function (res) {
        $scope.bookings = res.data;
        console.log("GET BOOKING ($scope.bookings): ", $scope.bookings);
      }, function (err) {
        console.log("GET BOOKING (err): ", err);
      });

      $scope.deleteBooking = function (bid, index) {
        adminFactory.deleteBookings(bid).then(function (res) {
          $scope.bookings.splice(index, 1);
          console.log("BOOKINGS FOR GIVEN DAY HAVE BEEN DELETED");
        }, function (err) {
          console.log('ERROR deleteBooking:', err);
        });
      };

      $scope.removeIndex = function () {
        adminFactory.removeIndex().then(function (res) {
          console.log("removeIndex()->TOKST, res:", res);
        }, function (err) {
          console.log("removeIndex(), err:", err);
        });
      };
      
      $scope.deleteCompany = function(cid, index) {
        adminFactory.deleteCompany(cid).then(function(res) {
            $scope.companies.splice(index, 1);
            console.log("deleteCompany(cid)->TOKST, res:", res);
        }, function(err) {
            console.log("deleteCompany(cid), err:", err);
        });
      };
      
      
      $scope.ATHUGA = function (pid) {
        adminFactory.getCustomerStory().then(function (res) {
          console.log("getCustomerStory() - THEE TOKSTS, res:", res);
        }, function (err) {
          console.log("getCustomerStory() - ERROR, err:", err);
        });
      }
    }]);
})();
