(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name segoEnnOgAfturApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the segoEnnOgAfturApp
   */
  angular.module('segoapp')
    .controller('HomeCtrl', ['$scope', '$rootScope', 'gluggaService', 'dagatalFactory', 'backendFactory', 'initialize', function ($scope, $rootScope, gluggaService, dagatalFactory, backendFactory, initialize) {

      $rootScope.$on('backendFactoryInit', function(ev, data) {
          update();
      });

      $scope.bookings = [];

      // BREYTA TIL AD HALDA UTAN UM VALINN DAG //
      var selectedDay = dagatalFactory.getDate();
      // TIL AD BIRTA ISLENSKT HEITI A DAGSETNINGUNNI
      $scope.dagurinnIdag = dagatalFactory.dateToStringISL();

      $scope.prevDay = function () {
        dagatalFactory.yesterday();
        $scope.getDailyBookings(selectedDay);
      };

      $scope.nextDay = function () {
        dagatalFactory.tomorrow();
        $scope.getDailyBookings(selectedDay);
      };

      // KEYRA update() TIL AD GERA OLL GOGN TILBUIN SEM A AD BIRTA
      function update() {
        bookingForToday = {};
        // SAEKJA BOKANIR FYRIR VALDA DAGSETNINGU
        cleanPage();
        backendFactory.getBookingByDate(dagatalFactory.getStringForDate(selectedDay)).then(function (res) {
          // If there are no bookings by given date -> return EMPTY ARRAY
          if (res.data.length === 0) {
            $scope.bookings =    [];
            $scope.curr =        {};
            $scope.loadingData = false;
          }
          else {
            // GEYMA BOKANIR
            $scope.bookings =    res.data;
            bookingsToday();
            $scope.loadingData = false;
          }
        }, function (err) {
          console.log("update()->getBookingByDate() ERR:", err);
        });
        // SAEKJA VERDLISTAN,
        backendFactory.getService().then(function (res) {
          // Set pricelist as pricelist for given response
          backendFactory.setPricelist(res.data);
        }, function (err) {
          console.log("ERROR getService(): ", err);
        });
        $scope.staff = backendFactory.Staff();
        $scope.times = dagatalFactory.timeSession();
      }
      // ENDIR update()

      // FYRIR PROGRESS MYND(
      $scope.loadingData = true;

      // HJALP FYRIR AD SETJA BOKANIR A RETTAN STAD I UTLITI
      // Breytti frá $scope i var, því enginn ástæða til að kalla á þetta fall á scope-i
      var bookingForToday = {};

      var bookingsToday = function () {
        var dictEndTime = {};
        for (var b in $scope.bookings) {
          console.log("ekkiBokun ", $scope.bookings);
          // FYRIR LENGD A TIMAPONTUNUM
          var sessionLength = dagatalFactory.getSessionLength(new Date($scope.bookings[b].startTime), new Date($scope.bookings[b].endTime));

          // BREYTA TIL AD SETJA SAMAN id SEM A AD SAEKJA UR DIV TOFLU
          var tmp = dagatalFactory.getHHMMfromDate(new Date($scope.bookings[b].startTime)) + "" + $scope.bookings[b].staff_id._id;
          // SETJA INN STADSETNINGU FYRIR BOKUN I $scope.bookings, fyrir ID-id sem britist a div toflunni
          bookingForToday[tmp] = b;
          var texti = "";
          var myElm = document.getElementById(tmp); // HH:MM{{STAFF_ID}} FOR 12:00{STAFF_ID}, 12:15{STAFF_ID}, 12:30{STAFF_ID}

          if (dictEndTime[$scope.bookings[b].staff_id._id] === undefined) {
            dictEndTime[$scope.bookings[b].staff_id._id] = $scope.bookings[b].endTime;
            texti = "confirmedBooking";
            if($scope.bookings[b].attendance === false) {
              texti = "confirmedBooking false";
            }
          }
          else {
            if (dictEndTime[$scope.bookings[b].staff_id._id] > $scope.bookings[b].startTime) {
              texti = "confirmedBooking right";
              if($scope.bookings[b].attendance === false) {
                texti = "confirmedBooking right false";
              }
            }
            else {
              texti = "confirmedBooking";

              if($scope.bookings[b].attendance === false) {
                texti = "confirmedBooking false";
              }
              dictEndTime[$scope.bookings[b].staff_id._id] = $scope.bookings[b].endTime;
            }
          }
          myElm.innerHTML =
            '<div style="height:' + (sessionLength * 3.1) + 'em;" class="' + texti + '" id="' + $scope.bookings[b].customer_id._id + '">' +
            $scope.bookings[b].customer_id.name;
        }
      };

      // HREINSA BLADSIDA FYRIR NYJAN DAG
      function cleanPage() {
        // Eyda geymdar bokanir i min
        $('.confirmedBooking').remove();
      }

      // HJALPAR FOLL OG BREYTA FYRIR, BREYTINGU A BOKUN I KERFINU - BokunDirective
      $scope.bookChangeInProgress = false;
      var bookingToChange = null;

      $scope.bookingChange = function(b) {
        $scope.bookChangeInProgress = true;
        bookingToChange = b;
      };

      $scope.cancelBookingChange = function() {
        $scope.bookChangeInProgress = false;
        bookingToChange = null;
      };
      // ENDIR A HJALP - BokunDirective

      // Get bookings for selected date in datepicker
      $scope.getDailyBookings = function (t) {
        cleanPage();
        dagatalFactory.setDate(t);
        selectedDay =         dagatalFactory.getDate();
        $scope.dagurinnIdag = dagatalFactory.dateToStringISL();
        update();
      };
      // t: TIMI, b: STARFSMADUR, date: DATE:FULLDATE
      $scope.openBooking = function (t, b, ev) {
        gluggaService.init($scope);
        if (t === undefined) {
          console.log("UNDEFINED");
        }
        else {
            var idForCell = bookingForToday[ev.currentTarget.id];
            if (idForCell !== undefined) {
                $scope.clickOnTimapant = $scope.bookings[idForCell];
                $scope.clickOnTimapant.name = b.name;
                gluggaService.bokunGluggi();
            }
            else {
                if ($scope.bookChangeInProgress) {
                    b.customer_id = bookingToChange.customer_id._id;
                    b.customer_name =  bookingToChange.customer_id.name;
                    b.customer_phone = bookingToChange.customer_id.phone;
                    b.service =        bookingToChange.service;
                    b.book_id =  bookingToChange._id;
                }
                else {
                    b.customer_name =  "";
                    b.customer_phone = "";
                    b.service =        [];
                }

                $scope.clickOnTimapant = {
                    name:      b.name,
                    book_id:   b.book_id,
                    customer_id: b.customer_id,
                    customer:  b.customer_name,
                    phone:     b.customer_phone,
                    service:   b.service,
                    staffId:   b._id,
                    date:      dagatalFactory.getStringForDate(new Date(selectedDay)),
                    startTime: dagatalFactory.getStringForDate(new Date(selectedDay), t)
                };
                gluggaService.bokaGluggi();
            }
        }
      };

      $scope.lokaBokun = function () {
        gluggaService.destroy();
        update();
      };
      // END OF BOOKING CLICK
    }]);
})();
