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

            var selectedService = {};

            function update() {
                // FOR CHECKBOX SELECTED SERVICE
                scope.serviceSelected = scope.objFrom.service;
                // GET THE TIME
                scope.timi = dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
                // TO CALCULATE ENDTIME
                scope.timeTaken = 0;
                scope.totalPrice = 0;
                // GET SERVICE THAT COMPANY OFFERS, MAYBE WISE TO ALLWAY MAKE THESE HTTP CALLS ?
                backendFactory.getService().then(function(res) {
                        // Set pricelist as pricelist for given response
                        scope.pricelist = res.data;
                    }, function(err) {
                        console.log("ERROR getService(): ", err);
                });
            }


            scope.toggleSelection = function(s) {
              var posOfSelected = scope.serviceSelected.indexOf(s._id);
                if (posOfSelected > -1) {
                  scope.serviceSelected.splice(posOfSelected, 1);
                  delete selectedService[s._id];
                  scope.timeTaken -= s.timeLength;
                  scope.totalPrice -= s.price;
                }
                else {
                  scope.serviceSelected.push(s._id);
                  selectedService[s._id] = {
                      "service_id": s._id,
                      "name": s.name,
                      "price": s.price
                  };
                  scope.timeTaken += s.timeLength;
                  scope.totalPrice += s.price;
                }
            };



            scope.stadfesta = function(bokun) {

              if (scope.bookingForm.$valid) {
                /*
                temporary leið til að bóka "annað" ekki nógu gott þarf að athuga með nýtt
                kall sennilega

                if (scope.objFrom.additionalService && scope.objFrom.additionalTime) {
                  var tmpEndTime = new Date(scope.objFrom.startTime);

                  tmpEndTime.setMinutes(tmpEndTime.getMinutes() + (scope.objFrom.additionalTime));
                  var arr = Object.keys(selectedService).map(function(key) { return selectedService[key]; });

                  console.log("tmpEndTime ", tmpEndTime + "  addtime "+ scope.objFrom.additionalTime);
                  backendFactory.postBooking({
                    startTime: scope.objFrom.startTime,
                    endTime: tmpEndTime,
                    staff_id: scope.objFrom.staffId,
                    customer_name:  scope.objFrom.additionalService,
                    customer_phone: "",
                    customer_service: arr,
                    date: scope.objFrom.date
                  }).then(function(doc) {
                    console.log("CB scope.stafesta() - doc: ", doc);
                    scope.serviceSelected = [];
                    scope.close();
                  }, function (err) {
                    console.log("CB scope.stafesta() - err: ", err);
                  });
                  return;
                }*/

                var tmpEndTime = new Date(scope.objFrom.startTime);

                tmpEndTime.setMinutes(tmpEndTime.getMinutes() + (scope.timeTaken/60));
                scope.badInput = false;
                // TIL AD BUA TIL ARRAY AF THJONUSTU.. i stad key->value
                var arr = Object.keys(selectedService).map(function(key) { return selectedService[key]; });

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
                scope.badInput = true;
              }
            };

            update();
        }
      };
    }]);
})();
