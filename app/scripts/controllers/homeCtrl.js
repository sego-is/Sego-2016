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
        var selectedDay = dagatalFactory.getStringForDate();

        // TIL AD BIRTA ISLENSKT HEITI A DAGSETNINGUNNI
        $scope.dagurinnIdag = dagatalFactory.dateToStringISL();

      $scope.prevDay = function() {
        dagatalFactory.yesterday();
        $scope.getDailyBookings(selectedDay);
      };

      $scope.nextDay = function() {
        dagatalFactory.tomorrow();
        $scope.getDailyBookings(selectedDay);
      };

        // KEYRA update() TIL AD GERA OLL GOGN TILBUIN SEM A AD BIRTA
        function update() {
            // SAEKJA BOKANIR FYRIR VALDA DAGSETNINGU
            backendFactory.getBookingByDate(selectedDay).then(function(res) {
                // If there are no bookings by given date -> return EMPTY ARRAY
                if (res.data.length === 0) {
                    $scope.bookings =    [];
                    $scope.curr =        {};
                    $scope.loadingData = false;
                }
                else {
                    // GEYMA BOKANIR
                    $scope.bookings = res.data;
                    bookingsToday();
                    $scope.loadingData = false;
                }
            }, function(err) {
                console.log("update()->getBookingByDate() ERR:", err);
            });
            // SAEKJA VERDLISTAN,
            backendFactory.getService().then(function(res) {
                console.log("getService(), res.data:", res.data);
                // Set pricelist as pricelist for given response
                backendFactory.setPricelist(res.data);
            }, function(err) {
                console.log("ERROR getService(): ", err);
            });
            $scope.staff = backendFactory.Staff();
            console.log("$scope.staff:", $scope.staff);
            $scope.times = dagatalFactory.timeSession();
        }
        // ENDIR update()

        // FYRIR PROGRESS MYND
        $scope.loadingData = true;

        // HJALP FYRIR AD SETJA BOKANIR A RETTAN STAD I UTLITI
        // Breytti frá $scope i var, því enginn ástæða til að kalla á þetta fall á scope-i
        var bookingForToday = {};

        var bookingsToday = function() {
          var staffBookings = [];

            var dictEndTime = {};
            for (var b in $scope.bookings) {

                var tmp = dagatalFactory.getHHMMfromDate( new Date($scope.bookings[b].startTime) ) + "" + $scope.bookings[b].staff_id._id;
                bookingForToday[tmp] = b;

              var sessionStart =  dagatalFactory.getHHMMfromDate( new Date($scope.bookings[b].startTime));
              var sessionEnd =    dagatalFactory.getHHMMfromDate( new Date($scope.bookings[b].endTime));
              var sessionLength = dagatalFactory.getSessionLength(new Date($scope.bookings[b].startTime), new Date($scope.bookings[b].endTime));

              staffBookings.push( {
                id:     $scope.bookings[b].staff_id._id,
                start:  sessionStart,
                end:    sessionEnd,
                marked: false
              });

              //console.log("start end: ", sessionStart +" "+ sessionEnd);

              var rowspan = 0;

              if (sessionLength % 2 === 0) {
                rowspan = (sessionLength/15) * 2;
                //console.log("name: ", $scope.bookings[b].customer_id.name);
                //console.log("rowspan true: ", rowspan);
              } else {
                rowspan = (sessionLength/15) * 2.2;
               //console.log("name: ", $scope.bookings[b].customer_id.name);
               // console.log("rowspan false: ", rowspan);
              }

              // console.log('b:', $scope.bookings[b]);
              // Mismun a startTime og endTime ==> 45 min
              var myElm = document.getElementById(tmp); // HH:MM{{STAFF_ID}} FOR 12:00{STAFF_ID}, 12:15{STAFF_ID}, 12:30{STAFF_ID}

                for(var i = 0; i < staffBookings.length; i++){
                  //console.log("staffBookings ", staffBookings[i]);
                  console.log("session start ", sessionStart);
                  console.log("staffbooking start ", staffBookings[i].start + "   "+ i);
                  if((sessionStart <= staffBookings[i].start) && (staffBookings[i].id === $scope.bookings[b].staff_id._id)) {console.log("ss <= stB.start ",$scope.bookings[b].staff_id.name );}

                  if(/*(sessionStart <= staffBookings[i].start) && */(staffBookings[i].id === $scope.bookings[b].staff_id._id)) {

                    //console.log("SAMI klippari ", sessionStart + " " + staffBookings[i].start + " t/f "+ staffBookings[i].marked);



                    if((sessionStart > staffBookings[i].start) && (sessionEnd <= staffBookings[i].end)) {

                      myElm.innerHTML =
                        '<div style="height:' + rowspan + 'em;" class="confirmedBookingRight" id="' + $scope.bookings[b].customer_id._id + '">' + $scope.bookings[b].customer_id.name + '</div>';
                      staffBookings[i].marked = true;
                      console.log("right", $scope.bookings[b].customer_id.name);
                      break;

                    }
                     else {
                      console.log("left ", $scope.bookings[b].customer_id.name);
                      myElm.innerHTML =
                        '<div style="height:' + rowspan + 'em;" class="confirmedBookingLeft" id="' + $scope.bookings[b].customer_id._id + '">' + $scope.bookings[b].customer_id.name + '</div>';
                      break;
                    }
                  }

                // console.log('b:', $scope.bookings[b]);
                // Mismun a startTime og endTime ==> 45 min
               /* var myElm = document.getElementById(tmp); // HH:MM{{STAFF_ID}} FOR 12:00{STAFF_ID}, 12:15{STAFF_ID}, 12:30{STAFF_ID}
                myElm.innerHTML =
                '<div style="height:' + rowspan + 'em;" class="confirmedBooking" id="' + $scope.bookings[b].customer_id._id + '">' + $scope.bookings[b].customer_id.name + '</div>';

                if (dictEndTime[$scope.bookings[b].staff_id._id] === undefined) {
                    dictEndTime[$scope.bookings[b].staff_id._id] = $scope.bookings[b].endTime;
                }
                else {
                    if (dictEndTime[$scope.bookings[b].staff_id._id] > $scope.bookings[b].startTime) {
                        console.log("UPPTEKKIN, KLIPPARI:", $scope.bookings[b]);
                        console.log("other,endTime:",  dictEndTime[$scope.bookings[b].staff_id._id])

                    }
                    else {
                        dictEndTime[$scope.bookings[b].staff_id._id] = $scope.bookings[b].endTime;
                    }
*/
                }
            }
        };

        // HREINSA BLADSIDA FYRIR NYJAN DAG
        function cleanPage() {
            $('.confirmedBookingLeft').remove();
            $('.confirmedBookingRight').remove();
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
                // GET ONLY SERVICE_ID FROM BOOKED SERVICE
                var arr = tmpBook.service.map(function(key) { return key.service_id; });
                b.service =        arr;

               /* var tmpFyrirThetta = document.getElementById(tmpBook.customer_id._id);
                if (tmpFyrirThetta.style.marginLeft) {
                    tmpFyrirThetta.style.marginLeft = "";
                }
                else {
                    tmpFyrirThetta.style.marginLeft = "50%";
                }*/
            }
            else {
                b.customer_name = "";
                b.customer_phone = "";
                b.service = [];
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
            console.log('clickOnTimapant:', $scope.clickOnTimapant);
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
