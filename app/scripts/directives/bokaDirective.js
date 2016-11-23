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

            scope.leave = function() {
                scope.close();
            };

            // FOR CHECKBOX SELECTED SERVICE
            scope.serviceSelected = scope.objFrom.service;

          // TO CALCULATE ENDTIME
            scope.timeTaken = 0;

            scope.toggleSelection = function(s) {
              var posOfSelected = scope.serviceSelected.indexOf(s._id);
                if (posOfSelected > -1) {
                  scope.serviceSelected.splice(posOfSelected, 1);
                  scope.timeTaken -= s.timeLength;
                }
                else {
                  scope.serviceSelected.push(s._id);
                  scope.timeTaken += s.timeLength;
                }
            };

            backendFactory.getService().then(function(res) {
                // Set pricelist as pricelist for given response
                scope.pricelist = res.data[0].pricelist;
              for(let i = 0; i < scope.pricelist.length; i++) {
                scope.pricelist[i].timeLength /= 60;
              }
            }, function(err) {
                console.log("ERROR getService(): ", err);
            });

            scope.stadfesta = function(bokun) {

              if (scope.bookingForm.$valid) {
                console.log("getur bókað það ", JSON.stringify(bokun));

                // kannski þarf að breyta timeTaken í sek
                console.log("service time ", scope.timeTaken);

                scope.badInput = false;

                // AFKOMMENTA ÞEGAR timeTaken ER READY

                /* backendFactory.postBooking({
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
                    scope.serviceSelected = [];
                    scope.close();
                }, function (err) {
                    console.log("CB scope.stafesta() - err: ", err);
                });*/
              } else {
                console.log("bad input ");
                scope.badInput = true;
              }
            };
        }
      };
    }]);
})();
