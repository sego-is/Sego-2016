(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('stillingar', ['$http', 'backendFactory', function ($http, backendFactory) {
      return {
        restrict: 'E',
        scope: {
          lokaGlugga: '&close'
        },
        templateUrl: '../../views/stillingar.html',
        link: function (scope, element, attrs) {
            
          // CREATE PERSON THAT WILL GET THE ROLE OF HAIRCUTTER OR DRESSER
          scope.person = {};
          scope.person.company_id = backendFactory.ID();
          scope.person.role = 1;
          
          scope.stadfestaStaff = function(s) {
              backendFactory.postPerson(s).then(function(res) {
                  scope.staff.push(res.data);
              }, function(err) {
                  console.log("ERROR stadfestaStaff(): ", err);
              });
          };
          // END OF CREATING HAIR.. //
          
          // CREATING SERVICE
          scope.service = {}
          scope.service.company_id = backendFactory.ID();
          
          scope.stadfestaService = function(s) {
              backendFactory.postService(s).then(function(res) {
                  scope.services.push(res.data);
                  console.log('stadfestaService(),', res.data);
              }, function(err) {
                  console.log("ERROR stadfestaService(): ", err);
              });
          }
          // END OF CREATE SERVICE
          
          // GET ALL STAFF AND SERVICE FOR SALOON
          scope.staff = [];
          //scope.services = [];
          
          getStaff();
          getService();
          
          function getStaff() {
              scope.staff = backendFactory.Staff();
          };
          
          function getService() {
              backendFactory.getService().then(function(res) {
                   scope.pricelist = res.data[0].pricelist;
                   console.log("SERVICE", scope.services);
              }, function(err) {
                  console.log("ERROR getService(): ", err);
              });
          };
         // END OF GETTING U/S
          
            
          scope.closeWindow = function () {
            scope.lokaGlugga();
          };

          scope.verdTrash = function (p) {
            /*
            backendFactory.deleteService(p).then(function(res) {
                console.log('index', index);
                scope.services.splice(index, 1);
                console.log('Response', res);
            }, function (err) {
                console.log('ERROR', err);
            });
            */
            console.log("Henda ur Pricelist", p);
            $http({
                url: 'http://wwww.sego.is:6969/api/services/tmpRestCall/',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
                },
                    data: {
                        service: p,
                        cid: backendFactory.ID()
                    }
             }).then(function successCallback(response) {

             }, function errorCallback(error) {

             });
          };

          scope.verdBreyting = function () {
            console.log("breyta verði");
          };

          scope.klippTrash = function (a, cid) {
           
          };

          scope.klippBreyting = function () {
            console.log("breyta klippara");
          };
          
          // TOGGLE BETWEEN PRICELIST AND STAFF also SHOWING ADDING FOR BOTH
          scope.state = {
              verdskra: false,
              add: false
          };
          
          scope.toggle = function() {
              scope.state.verdskra = !scope.state.verdskra;
          };
          
          scope.add = function() {
              scope.state.add = !scope.state.add;
          }
          // END OF TOGGLE
        }
      };
    }]);
})();
