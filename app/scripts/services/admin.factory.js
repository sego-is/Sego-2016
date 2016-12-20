(function () {
  'use strict';

  angular
    .module('segoapp')
    .factory('adminFactory', ['$http', function ($http) {
      var adminFactory = {};
//------------------------------ ADMIN CALLS ------------------------------//
      adminFactory.getPersons = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/persons/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.getCompanies = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/companies/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.getAllService = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.removeService = function (sid) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/',// + sid,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.deleteBookings = function (bid) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + bid,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.postCompany = function (c) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/companies/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: c
        });
      };

      adminFactory.deleteCompany = function (cid) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/companies/' + cid,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.getBooking = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.removeIndex = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/index',
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      adminFactory.getBook = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/book',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      //------------------------------ END OF -> ADMIN CALLS ------------------------------//
      return adminFactory;

    }]);
})();
