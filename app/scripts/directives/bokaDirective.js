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
        link: function (scope, element, attrs) {

            var selectedService = {};

            function init() {
                // GET THE TIME
                scope.timi = dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
                // TO CALCULATE ENDTIME
                scope.timeTaken = 0;
                scope.totalPrice = 0;
                // FOR CHECKBOX SELECTED SERVICE
                scope.serviceSelected = [];
                
                // IF THERE IS SOMETHING IN ARRAY THEN THERE IS CHANGE OF BOOKING //
                if (scope.objFrom.service.length > 0) {
                    console.log("scope.objFrom.service:", scope.objFrom.service);
                    
                    for (var i in scope.objFrom.service) {
                        scope.serviceSelected.push(scope.objFrom.service[i].service_id);
                        console.log("scope.objFrom.service[i]:", scope.objFrom.service[i]);

                        selectedService[scope.objFrom.service[i].service_id] = {
                            "service_id":scope.objFrom.service[i].service_id,
                            "name": scope.objFrom.service[i].name,
                            "price": scope.objFrom.service[i].price,
                            "timeLength": scope.objFrom.service[i].timeLength
                        };
                        
                        scope.totalPrice += scope.objFrom.service[i].price;
                        scope.timeTaken += scope.objFrom.service[i].timeLength;
                    }
                }
                
                
                // GET SERVICE THAT COMPANY OFFERS, MAYBE WISE TO ALLWAY MAKE THESE HTTP CALLS ?
                backendFactory.getService().then(function(res) {
                        // Set pricelist as pricelist for given response
                        scope.pricelist = res.data;
                    }, function(err) {
                        console.log("ERROR getService(): ", err);
                });
            }


            scope.toggleSelection = function(s) {
                console.log('S:', s);
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
                      "price": s.price,
                      "timeLength": s.timeLength
                  };
                  scope.timeTaken += s.timeLength;
                  scope.totalPrice += s.price;
                }
            };



            scope.stadfesta = function(bokun) {

              if (scope.bookingForm.$valid) {
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
                        if (scope.objFrom.book_id !== undefined) {
                            backendFactory.removeBooking({
                                _id: scope.objFrom.book_id,
                                date: scope.objFrom.date,
                                customer_id: {
                                    _id: scope.objFrom.customer_id
                                }
                            }).then(function(res) {                
                                scope.finishChange();        
                                console.log("HAVE BEEN CREATEAD AND DELETED");
                            }, function(err) {
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
