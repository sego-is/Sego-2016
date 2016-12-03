(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('boka', ['backendFactory', 'dagatalFactory', function (backendFactory, dagatalFactory) {
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
            console.log('scope.objFrom:', scope.objFrom);
            // TO CALCULATE ENDTIME
            scope.timeTaken = 0;
            // SMA HACK TIL AD SENDA INN NAME OG PRICE MED SERVICE ID
            var VALIN_THJONUSTA = {};
            
            scope.toggleSelection = function(s) {
                console.log("toggleSelection, s:", s);
              var posOfSelected = scope.serviceSelected.indexOf(s._id);
                if (posOfSelected > -1) {
                  scope.serviceSelected.splice(posOfSelected, 1);
                  delete VALIN_THJONUSTA[s._id];
                  scope.timeTaken -= s.timeLength;
                }
                else {
                  scope.serviceSelected.push(s._id);
                  VALIN_THJONUSTA[s._id] = { 
                      "service_id": s._id,
                      "name": s.name,
                      "price": s.price
                  };
                  scope.timeTaken += s.timeLength;
                }
            };

            backendFactory.getService().then(function(res) {
                // Set pricelist as pricelist for given response
                scope.pricelist = res.data;
            }, function(err) {
                console.log("ERROR getService(): ", err);
            });

            scope.stadfesta = function(bokun) {

              if (scope.bookingForm.$valid) {
                console.log("getur bókað það ", JSON.stringify(bokun));

                // kannski þarf að breyta timeTaken í sek
                console.log("service time ", scope.timeTaken);

                var tmpEndTime = new Date(scope.objFrom.startTime);
                tmpEndTime.setMinutes(tmpEndTime.getMinutes() + (scope.timeTaken/60));

                console.log("tmpEndTime:", tmpEndTime);

                scope.badInput = false;
                
                
                // TIL AD BUA TIL ARRAY AF THJONUSTU.. i stad key->value                
                var arr = Object.keys(VALIN_THJONUSTA).map(function(key) { return VALIN_THJONUSTA[key]; })
                
                backendFactory.postBooking({
                    startTime: scope.objFrom.startTime,
                    endTime: tmpEndTime,
                    staff_id: scope.objFrom.staffId,
                    customer_name:  scope.objFrom.customer,
                    customer_phone: scope.objFrom.phone,
                    customer_service: arr,
                    date: scope.objFrom.date
                }).then(function(doc) {
                    console.log("CB scope.stafesta() - doc: ", doc);
                    scope.serviceSelected = [];
                    scope.close();
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
