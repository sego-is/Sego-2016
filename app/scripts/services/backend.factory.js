(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('backendFactory', ['$http', function ($http) {
        
        var company_id = null; // THIS IS _id from MongoDB not auth_id //
        var backendFactory = {};
        
        backendFactory.setID = function(id) {
            company_id = id;
        }
        
        backendFactory.getID = function() {
            return company_id;
        }
        
        // COMPANY REST CALLS
        backendFactory.getCompanies = function() {
            return $http({
                url: 'http://wwww.sego.is:6969/api/companies',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                }
            });
        }
            
        backendFactory.getCompanyByAuthID = function(c) {
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
        
        backendFactory.postCompany = function(c) {
            return $http({
                url: 'http://wwww.sego.is:6969/api/companies',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: c
            });
        }
      
        // PERSON REST CALLS / BOTH FOR CUSTOMERS AND STAFF //
        backendFactory.getPersons = function() {
            return $http({
                url: 'http://wwww.sego.is:6969/api/persons',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                }
            });
        };
        
        backendFactory.postPerson = function(p) { 
            return $http({
                url: 'http://wwww.sego.is:6969/api/persons',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: p
            });
        };
        
        backendFactory.deletePerson = function(pid) {
            return $http({
                    url: 'http://wwww.sego.is:6969/api/persons/',
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                    },
                    params: {
                        id: pid
                    }
            });
        };
        
        backendFactory.getStaff = function() {
            if (company_id != null) {
                return $http({
                    url: 'http://wwww.sego.is:6969/api/persons/',
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                    },
                    params: {
                        company_id: company_id
                    }
                });
            }
            else {
                
            }
            
        };
        // END OF PERSON, AND CUSTOMERS AND STAFF 
 
 
        // BOOKING REST CALLS
        backendFactory.postBooking = function(p) {
            return $http({
                url: 'http://wwww.sego.is:6969/api/bookings',
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
        backendFactory.getService = function() {
            return $http({
                url: 'http://wwww.sego.is:6969/api/services',
                method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                    },
                    params: {
                        company_id: company_id
                    }
            });    
        };
        
        backendFactory.postService = function(s) { 
            return $http({
                url: 'http://wwww.sego.is:6969/api/services',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: s
            });
        };
        
        backendFactory.delService = function(i) {
            return $http({
                url: 'http://wwww.sego.is:6969/api/services',
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                params: {
                    id: i
                }
            });
        };
        // END OF SERVICE
        
        return backendFactory;
    }]);
})();
