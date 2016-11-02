(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('backendFactory', ['$http', function ($http) {
        
        var company_id = null;
        var backendFactory = {};
        
        backendFactory.setID = function(id) {
            company_id = id;
        }
        
        backendFactory.getID = function() {
            return company_id;
        }
        
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
        
        // GET HAIRDRESSER FOR SALOON //
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
        }
        
            // END GETTING HAIRDRESSERS FROM SALOON
 
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
        
        return backendFactory;

    }]);
})();
