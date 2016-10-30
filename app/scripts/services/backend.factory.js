(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('backendFactory', ['$http', function ($http) {
        var company_id = null;
        
        var getRass = function() {
            // CHECK OUT IF PAGE CAN CONNECT TO REST-API
            $http({
                url: 'http://wwww.sego.is:6969/api/bookings',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
            }}).then(function (response) {
                console.log("RESPONSE:", response);
            }, function(err) {
                console.log("ERROR", JSON.stringify(err));
            });
            // END OF CHECK
        };
        
        // GET HAIRDRESSER FOR SALOON //
        var getStaff = function() {
            if (company_id != null) {
                $http({
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
                }).then(function (response) {
                    console.log("RESPONSE:", response);
                    return response.data;
                }).catch(function(err) {
                    console.log("ERROR", JSON.stringify(err));
                    return err;
                }).finally(function() {} );
            }
        }
          
            // END GETTING HAIRDRESSERS FROM SALOON
 
        var postBooking = function(p) {
            $http({
                url: 'http://wwww.sego.is:6969/api/bookings',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                data: p
            }).then(function (response) {
                console.log("RESPONSE:", response);
            }).catch(function(err) {
                console.log("ERROR", JSON.stringify(err));
            }).finally(function() {} );
        };
        
    	return {
            setID: function(a) {
                this.company_id = a;    
            },
            getID: function() {
                return this.company_id;
            },
            getStaff: getStaff,
            getRass: getRass,
            postBooking: postBooking
    	};

    }]);
})();
