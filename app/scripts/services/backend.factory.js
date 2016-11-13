(function () {
  'use strict';

  angular
    .module('segoApp')
    .factory('backendFactory', ['$http', function ($http) {
      var _company = null; // THIS IS COMPANY COLLECTION FROM DB //

      var backendFactory = {};

      backendFactory.set = function (company) {
        _company = company;
      }

      backendFactory.ID = function () {
        return _company._id;
      }
      
      backendFactory.setServiceID = function(id) {
        _company.serviceID = id;    
      }
      
      backendFactory.ServiceID = function() {
          return _company.serviceID;
      }
      
      backendFactory.Staff = function () {
        if (_company != null) {
          return _company.staff;
        }
      }

      // COMPANY REST CALLS
      backendFactory.getCompanies = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/companies/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      }

      backendFactory.getCompanyByAuthID = function (c) {
        return $http({
          method: 'GET',
          url: 'http://wwww.sego.is:6969/api/companies/',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          params: {
            id: c
          }
        });
      }

      backendFactory.postCompany = function (c) {
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
      }
      
      backendFactory.getStaff = function() {
        return $http({
          method: 'GET',
          url: 'http://wwww.sego.is:6969/api/persons/',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          params: {
            company_id: this.ID()
          }
        });  
      };
      
      // PERSON REST CALLS / BOTH FOR CUSTOMERS AND STAFF //
      backendFactory.getPersons = function () {
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


      // END OF PERSON, AND CUSTOMERS AND STAFF


      // BOOKING REST CALLS
      backendFactory.getBooking = function() {
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
      
      backendFactory.getBookingByDate = function(date) {
          return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + date + '/' + this.ID(),
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      }
      
      backendFactory.postBooking = function (p) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: p
        });
      };
      // END OF BOOKING

      // SERVICE REST CALLS
      backendFactory.getService = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          params: {
            company_id: this.ID()
          }
        });
      };

      backendFactory.postService = function (s) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: s
        });
      };


      backendFactory.postPerson = function (p) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/persons/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: p
        });
      };

      backendFactory.deletePerson = function (pid) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/persons/' + pid,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      backendFactory.deleteFromPricelist = function (p) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/pricelist/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: {
            service: p,
            cid: this.ID()
          }
        });
      };

      backendFactory.editPricelist = function(p) {
          p.serviceID = this.ServiceID;
          return $http({
          url: 'http://wwww.sego.is:6969/api/services/pricelist/',
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: p
        });
        /*
        console.log("OBJECT_SENT_I_EDITPRICELIST:", p);
        p.company_id = this.ID();
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/editPricelist',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: p
        });
        */
      }

      backendFactory.deleteFromStaff = function (s) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/companies/staff/',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: {
            staff: s,
            cid: this.ID()
          }
        });
      };

      
      

      backendFactory.deleteService = function (s) {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/' + s._id,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: {
            id: s._id,
            cid: s.cid
          }
        });
      };
      // END OF SERVICE

      return backendFactory;

    }]);
})();
