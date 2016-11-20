(function () {

  'use strict';

  angular
    .module('segoApp')
    .directive('boka', ['backendFactory', function (backendFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close',
          objFrom: '=objFrom'

        },
        templateUrl: '../../views/boka.html',
        link: function (scope, element, attrs) {
          /*
            scope.bokun = {};

            scope.bokun.timi = scope.objFrom.timi;

            // kannski ad huga ad lengdinni hja mer seinna
            scope.bokun.klippari = scope.objFrom.nafn.name;
            scope.bokun.dags = scope.objFrom.dags;
            */
          console.log("DAGS ", scope.objFrom);

            scope.leave = function() {
                scope.close();
            };
          // FOR CHECKBOX SELECTED SERVICE
          scope.serviceSelected = [];
          scope.toggleSelection = function(s) {
              var posOfSelected = scope.serviceSelected.indexOf(s._id);
              if (posOfSelected > -1) {
                     scope.serviceSelected.splice(posOfSelected, 1);
              }
              else {
                  scope.serviceSelected.push(s._id);
              }
              console.log("serviceSelected:", scope.serviceSelected);
          };
          
          backendFactory.getService().then(function(res) {
            scope.pricelist = res.data[0].pricelist;
          }, function(err) {
            console.log("ERROR getStaf(): ", err);
          });
          scope.serviceCheckbox = {};

            scope.stadfesta = function(bokun) {

              if(scope.bookingForm.$valid) {
                console.log("getur bókað það ", JSON.stringify(bokun));
                scope.badInput = false;
                backendFactory.postBooking({
                 company_id: backendFactory.ID(),
                 startTime: scope.objFrom.startTime,
                 endTime: scope.objFrom.endTime,
                 staff_id: scope.objFrom.staffId,
                 customer_name:  scope.objFrom.customer,
                 customer_phone: scope.objFrom.phone,
                 customer_service: scope.serviceSelected,
                 date: scope.objFrom.date
                 }).then(function(doc) {
                  console.log("CB scope.stafesta() - doc: ", doc);
                 }, function (err) {
                  console.log("CB scope.stafesta() - err: ", err);
                 });
              } else {
                console.log("bad input ");
                scope.badInput = true;
              }
            };
        }
      };
    }]);
})();
