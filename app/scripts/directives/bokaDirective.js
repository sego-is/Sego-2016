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

            function init() {
                // GET THE TIME
                scope.timi = dagatalFactory.getHHMMfromDate(new Date(scope.objFrom.startTime));
                // TO CALCULATE ENDTIME
                scope.timeTaken = 0;
                scope.totalPrice = 0;
                // FOR CHECKBOX SELECTED SERVICE
                scope.serviceSelected = scope.objFrom.service;
                
                // IF THERE IS SOMETHING IN ARRAY THEN THERE IS CHANGE OF BOOKING //
                if (scope.serviceSelected.length > 0) {
                    console.log("scope.objFrom.service:", scope.objFrom.service);
                    var arr = Object.keys(scope.objFrom.service).map(function(key) { return scope.objFrom.service[key].service_id; });
                    for (var i in scope.serviceSelected) {
                        console.log("scope.serviceSelected[i]:", scope.serviceSelected[i]);
                        selectedService[scope.serviceSelected[i]._id] = {
                            "service_id": scope.serviceSelected[i]._id,
                            "name": scope.serviceSelected[i].name,
                            "price": scope.serviceSelected[i].price,
                            "timeLength": scope.serviceSelected[i].timeLength
                        };
                        scope.totalPrice += scope.serviceSelected[i].price;
                        scope.timeTaken += scope.serviceSelected[i].timeLength;
                    }
                    scope.serviceSelected = arr;
                    console.log("arr:", arr);
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
              var posOfSelected = scope.serviceSelected.indexOf(s.service_id);
                if (posOfSelected > -1) {
                  scope.serviceSelected.splice(posOfSelected, 1);
                  delete selectedService[s.service_id];
                  scope.timeTaken -= s.timeLength;
                  scope.totalPrice -= s.price;
                }
                else {
                  scope.serviceSelected.push(s.service_id);
                  selectedService[s._id] = {
                      "service_id": s.service_id,
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
                console.log('ARRR, arr:', arr);
                
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
                                console.log("HAVE BEEN CREATEAD AND DELETED");
                            }, function(err) {
                                console.log('CREATED, THEN ERROR DELETING, err:', err);                                
                            });
                        }
                        scope.close();
                        scope.serviceSelected = [];
                        selectedService = {};
                            
 
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
