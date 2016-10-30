(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('backendFactory', ['$http', function ($http) {
        var company_id;
        
        var getRass = function() {
            // CHECK OUT IF PAGE CAN CONNECT TO REST-API
            $http({
                url: 'http://wwww.sego.is:6969/api/booking',
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
        
        var postBooking = function(p) {
            $http({
                url: 'http://wwww.sego.is:6969/api/booking',
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
            getRass: getRass,
            postBooking: postBooking
    	};

    }]);
})();
