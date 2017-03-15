(function () {

  'use strict';

  angular
    .module('segoapp')
    .directive('boka', ['backendFactory', 'dagatalFactory', function (backendFactory, dagatalFactory) {
      return {
        restrict: 'E',
        scope: {
          close: '&close',
          objFrom: '=objFrom',
          finishChange: '&finishChange'
        },
        templateUrl: '../../views/boka.html',
        link: function (scope) {

          var selectedService = {};

          function init() {
            // GET THE TIME
            scope.timi = dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
            // TO CALCULATE ENDTIME
            scope.timeTaken =  0;
            scope.totalPrice = 0;
            scope.endTime =    scope.timi;
            // FOR CHECKBOX SELECTED SERVICE
            scope.serviceSelected = [];
            scope.bokaAnnad = false;

            // IF THERE IS SOMETHING IN ARRAY THEN THERE IS CHANGE OF BOOKING //
            if (scope.objFrom.service.length > 0) {

              for (var i in scope.objFrom.service) {
                scope.serviceSelected.push(scope.objFrom.service[i].service_id);
                selectedService[scope.objFrom.service[i].service_id] = {
                  "service_id": scope.objFrom.service[i].service_id,
                  "name":       scope.objFrom.service[i].name,
                  "price":      scope.objFrom.service[i].price,
                  "timeLength": scope.objFrom.service[i].timeLength
                };

                scope.totalPrice += scope.objFrom.service[i].price;
                scope.timeTaken +=  scope.objFrom.service[i].timeLength;
              }
            }

            // GET SERVICE THAT COMPANY OFFERS, MAYBE WISE TO ALLWAYS MAKE THESE HTTP CALLS ?
            backendFactory.getService().then(function (res) {
              // Set pricelist as pricelist for given response
              scope.pricelist = res.data;
            }, function (err) {
              console.log("ERROR getService(): ", err);
            });
          }

          scope.annad = function () {
            scope.bokaAnnad = !scope.bokaAnnad;
          };

          scope.toggleSelection = function (service) {
            scope.endTime = new Date(scope.objFrom.startTime);
            var posOfSelected = scope.serviceSelected.indexOf(service._id);
            if (posOfSelected > -1) {
              scope.serviceSelected.splice(posOfSelected, 1);
              delete selectedService[service._id];
              scope.timeTaken -=  service.timeLength;
              scope.totalPrice -= service.price;
            } else {
              scope.serviceSelected.push(service._id);
              selectedService[service._id] = {
                "service_id": service._id,
                "name":       service.name,
                "price":      service.price,
                "timeLength": service.timeLength
              };
              scope.timeTaken +=  service.timeLength;
              scope.totalPrice += service.price;
            }
            scope.endTime.setMinutes(scope.endTime.getMinutes() + (scope.timeTaken / 60));
            scope.endTime = dagatalFactory.getHHMMfromDate(new Date(scope.endTime));
          };

          scope.stadfesta = function (bokun) {
            if (scope.bookingForm.$valid) {
              var tmpEndTime = new Date(scope.objFrom.startTime);
              tmpEndTime.setMinutes(tmpEndTime.getMinutes() + (scope.timeTaken / 60));
              console.log(tmpEndTime + " " + scope.endTime);
              scope.badInput = false;
              // TIL AD BUA TIL ARRAY AF THJONUSTU.. i stad key->value
              var arr = Object.keys(selectedService).map(function (key) {
                return selectedService[key];
              });

              backendFactory.postBooking({
                startTime:        scope.objFrom.startTime,
                endTime:          tmpEndTime,
                staff_id:         scope.objFrom.staffId,
                customer_name:    scope.objFrom.customer,
                customer_phone:   scope.objFrom.phone,
                customer_service: arr,
                date:             scope.objFrom.date
              }).then(function (doc) {
                if (scope.objFrom.book_id !== undefined) {
                  backendFactory.removeBooking({
                    _id:  scope.objFrom.book_id,
                    date: scope.objFrom.date,
                    customer_id: {
                      _id: scope.objFrom.customer_id
                    }
                  }).then(function (res) {
                    scope.finishChange();
                  }, function (err) {
                    console.log('CREATED, THEN ERROR DELETING, err:', err);
                  });
                }
                scope.close();
                scope.serviceSelected = [];
                selectedService = {};
                scope.objFrom = {};
              }, function (err) {
                console.log("CB scope.stafesta() - err: ", err);
              });
            } else {
              scope.badInput = true;
            }
          };
          init();
        }
      };
    }]);
})();
