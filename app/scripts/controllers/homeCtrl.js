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
    .controller('HomeCtrl', ['$scope', '$compile', 'dagatalFactory', 'backendFactory', function ($scope, $compile, dagatalFactory, backendFactory) {
      $scope.bookings = [];
      // GET COMPANY INFORMATION BY AUTH_ID THAT WAS CONNECTING //
      var p = JSON.parse(localStorage.getItem('profile'));
      backendFactory.getCompanyByAuthID(p.user_id).then(function successCallback(response) {
        backendFactory.set(response.data[0]);
        console.log("RESPONSE GET COMPANY BY AUTH ID", response.data[0]);
        // UPPLYSINGAR VARDANDI INNSKRA-ANDA HEFUR VERID SOTT, THEN run update()
        update();
      }, function errorCallback(error) {
        console.log("ERROR", error);
      });

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
        // SAEKJA BOKANIR FYRIR VALDA DAGSETNINGU
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
          console.log("getService(), res.data:", res.data);
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
          console.log("BOOKING4TODAY:", bookingForToday);
        var dictEndTime = {};
        for (var b in $scope.bookings) {
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
          }
          else {
            if (dictEndTime[$scope.bookings[b].staff_id._id] > $scope.bookings[b].startTime) {
              texti = "confirmedBooking right";
            }
            else {
              texti = "confirmedBooking";
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
        $('.confirmedBooking').remove();
      }

      // Get bookings for selected date in datepicker
      $scope.getDailyBookings = function (t) {
        cleanPage();
        dagatalFactory.setDate(t);
        selectedDay =         dagatalFactory.getDate();
        $scope.dagurinnIdag = dagatalFactory.dateToStringISL();
        update();
      };

      // FOR THE BOOKING WHEN TIME IS PICKED ON DAILY SCHEDULE
      var booking;

      // t: TIMI, b: STARFSMADUR, date: DATE:FULLDATE
      $scope.openBooking = function (t, b, ev) {
        if (t === undefined) {
          console.log("UNDEFINED");
        }
        else {
          var idForCell = bookingForToday[ev.currentTarget.id];
          if (idForCell !== undefined) {
            var tmpBook =      $scope.bookings[idForCell];
            b.customer_name =  tmpBook.customer_id.name;
            b.customer_phone = tmpBook.customer_id.phone;
            var arr =          tmpBook.service.map(function (key) {
              return key.service_id;
            });
            b.service = arr;
          }
          else {
            b.customer_name =  "";
            b.customer_phone = "";
            b.service =        [];
          }

          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          booking = $scope.$new();
          var compiledDirective;

          $scope.clickOnTimapant = {
            name:      b.name,
            customer:  b.customer_name,
            phone:     b.customer_phone,
            service:   b.service,
            staffId:   b._id,
            date:      dagatalFactory.getStringForDate(new Date(selectedDay)),
            startTime: dagatalFactory.getStringForDate(new Date(selectedDay), t)
          };
          compiledDirective = $compile('<boka class="skilabod" ' +
            'close="lokaBokun()" obj-from="clickOnTimapant"></boka>');
          var directiveElement = compiledDirective(booking);
          $('.skilaboda-haldari').append(directiveElement);
        }
      };

      $scope.lokaBokun = function () {
        booking.$destroy();
        $('.skilaboda-haldari').empty();
        document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "hidden";
        update();
      };
      // END OF BOOKING CLICK
    }]);
})();
