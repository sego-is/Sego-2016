(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name segoEnnOgAfturApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the segoEnnOgAfturApp
   */
  angular.module('segoApp')
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
            backendFactory.getBookingByDate(selectedDay).then(function(res) {
                // If there are no bookings by given date -> return EMPTY ARRAY
                if (res.data.length === 0) {
                    $scope.bookings = [];
                    $scope.curr = {};
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
            $scope.staff = backendFactory.Staff();
            $scope.times = dagatalFactory.timeSession();
        }
        // ENDIR update()

        // FYRIR PROGRESS MYND
        $scope.loadingData = true;
        
        // HJALP FYRIR AD SETJA BOKANIR A RETTAN STAD I UTLITI
        // Breytti frá $scope i var, því enginn ástæða til að kalla á þetta fall á scope-i
        var bookingForToday = {};
        
        var bookingsToday = function() {
            for (var b in $scope.bookings) {
                var tmp = dagatalFactory.getHHMMfromDate( new Date($scope.bookings[b].startTime) ) + "" + $scope.bookings[b].staff_id;
                bookingForToday[tmp] = b;
                var myElm = document.getElementById(tmp);
                myElm.innerHTML =
                  '<p class="confirmedBooking">' + $scope.bookings[b].customer_id.name + '</p>';
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
            selectedDay = dagatalFactory.getDate()
            $scope.dagurinnIdag = dagatalFactory.dateToStringISL();
            console.log("$scope.dagurinnIdag: ", $scope.dagurinnIdag);
            /**********************************************************************************************/
            /* $scope.dagurinnIdag = dagatalFactory.dagsetning( vantar lausn á að uppfæra daginn í dag ); */
            /**********************************************************************************************/
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
                var tmpBook = $scope.bookings[idForCell];
                b.customer = tmpBook.customer_id.name;
                b.phone = tmpBook.customer_id.phone;
            }
            else {
                b.customer = "Sláðu inn nafn...";
                b.phone = 5551234; 
            }
            document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
            booking = $scope.$new();
            var compiledDirective;

            $scope.clickOnTimapant = {
                name: b.name,
                customer: b.customer,
                phone: b.phone,
                staffId: b.person_id,
                date: dagatalFactory.getStringForDate(new Date(selectedDay)),
                startTime: dagatalFactory.getStringForDate(new Date(selectedDay), t),
                endTime: dagatalFactory.getStringForDate(new Date(selectedDay), '18:00')
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
      };
      // END OF BOOKING CLICK
    }]);
})();
