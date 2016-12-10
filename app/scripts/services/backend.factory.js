(function () {
  'use strict';

  angular
    .module('segoapp')
    .factory('backendFactory', ['$http', function ($http) {
      var _company = null; // THIS IS COMPANY COLLECTION FROM DB //
      var _pricelist = {};

      var backendFactory = {};

      backendFactory.set = function (company) {
          if (company !== undefined) {
            _company = company;
          }
      };

      backendFactory.setPricelist = function(prices) {
          if (_company !== null) {
              _company.pricelist = prices;
              console.log("setPricelisT(prices): _company:", _company);
          }
      };

      backendFactory.ID = function () {
          if (_company !== null) {
              return _company._id;
          }
      };

      backendFactory.Staff = function () {
        if (_company !== null) {
          return _company.staff;
        }
      };

      backendFactory.getServiceById = function(sid) {
          if (_pricelist[sid] === undefined) {
            for (var i in _company.pricelist) {
                if (_company.pricelist[i]._id === sid) {
                    _pricelist[sid] = _company.pricelist[i];
                }
            }
          }
          return _pricelist[sid];
      };

      backendFactory.Pricelist = function() {
          if (_company !== null) {
              return _company.pricelist;
          }
      };

      backendFactory.getStaffById = function(pid) {
        for (var i in _company.staff) {
            if (_company.staff[i]._id === pid) {
                return _company.staff[i].name;
            }
        }
        return "PERSON NOT FOUND.. EXCUSE US";
      };



      var p = JSON.parse(localStorage.getItem('profile'));
      //------------------------------ NORMAL PEOPLE CALLS ------------------------------//
      backendFactory.init = function() {
          if (p === null) {
              
          }
          else {
              return $http({
                method: 'GET',
                url: 'http://wwww.sego.is:6969/api/companies/' + p.user_id,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                }
                });
          }
        };
      
      backendFactory.getCompanyByAuthID = function (c) {
        return $http({
          method: 'GET',
          url: 'http://wwww.sego.is:6969/api/companies/' + c,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

      backendFactory.getCustomerByCID = function() {
        return $http({
            method: 'GET',
            url: 'http://www.sego.is:6969/api/companies/customers/' + this.ID(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
        });
      };

      backendFactory.getCustomerStory = function(pid) {
          return $http({
              method: 'GET',
              url: 'http://www.sego.is:6969/api/book/' + this.ID() + '/' + pid,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }
          });
      };

      // PERSON REST CALLS / BOTH FOR CUSTOMERS AND STAFF //



      // END OF PERSON, AND CUSTOMERS AND STAFF


      // BOOKING REST CALLS


      backendFactory.getBookingByCompany = function() {
          return $http({
              url: 'http://wwww.sego.is:6969/api/bookings/' + this.ID(),
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
          url: 'http://wwww.sego.is:6969/api/bookings/' + this.ID() + '/' + date ,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };

       backendFactory.getBookingByMonth = function(date) {
          console.log("GETBOOKINGBYMONTH, date:", date);
          return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + this.ID() + '/' + date + '/month',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };
      
      backendFactory.notAttendBooking = function(b) {
          b.company_id = this.ID();
          return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + b._id,
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: b
        });
      };
      
      backendFactory.removeBooking = function(b) {
          return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + this.ID() + '/' + b.date + '/' + b._id + '/' + b.customer_id._id ,
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          }
        });
      };
      
      backendFactory.postBooking = function (p) {
        p.company_id = this.ID();
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

      backendFactory.updateBooking = function(b) {
        b.company_id = this.ID();
        return $http({
          url: 'http://wwww.sego.is:6969/api/bookings/' + b._id,
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: b
        });
      };
      // END OF BOOKING

      // SERVICE REST CALLS
      backendFactory.getService = function () {
        return $http({
          url: 'http://wwww.sego.is:6969/api/services/' + this.ID(),
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
        s.company_id  = this.ID();
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

      backendFactory.updatePricelist = function(p) {
        p.cid = this.ServiceID;
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
      // DE-ACTIVE FROM PRICELIST //
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

      backendFactory.updateStaff = function(s) {
          console.log("UpdateStaff(s) -> s =>", s);
          s.cid = this.ID();
          return $http({
          url: 'http://wwww.sego.is:6969/api/companies/staff/',
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token')
          },
          data: s
        });
      };

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



      return backendFactory;

    }]);
})();
