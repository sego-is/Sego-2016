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
        var selectedDay = dagatalFactory.dags();
        // COUNTER SEM HELDUR UTAN UM THANN NAESTA BOKADA TIMA FYRIR UTLIT A BOKINNI
        var counter = 0;
        
              
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
                    // NAESTA BOKUN SEM VERDUR BIRT FYRST I RENDER A TOFLU
                    $scope.nextBooking();
                    $scope.loadingData = false;
                    console.log("BOOKINGS", $scope.bookings);
                }
            }, function(err) {
                console.log("update()->getBookingByDate() ERR:", err);
            });
            $scope.staff = backendFactory.Staff();
            $scope.dagurinnIdag = dagatalFactory.dagsetning();
            $scope.times = dagatalFactory.timabokanir();
             
            
        };
        // ENDIR update()
        
        // FYRIR PROGRESS MYND
        $scope.loadingData = true;
        
        // HJALP FYRIR AD SETJA BOKANIR A RETTAN STAD I UTLITI
        
        $scope.nextBooking = function() {
            if (counter < $scope.bookings.length) {
                $scope.curr = $scope.bookings[counter];
                $scope.curr.time = dagatalFactory.getHHMMfromDate( new Date($scope.bookings[0].startTime) );
                console.log("timi", $scope.curr.time);
                console.log("counter", counter);
                counter = counter + 1;
            }
        }
      
        // Get bookings for selected date in datepicker
        $scope.getDailyBookings = function (t) {
            selectedDay = t;
            update();
        };


      // FOR THE BOOKING WHEN TIME IS PICKED ON DAILY SCHEDULE
      var booking;
      // t: TIMI, b: STARFSMADUR, date: DATE:FULLDATE
      $scope.openBooking = function (t, b, date) {
        if (t === undefined) {
          console.log("UNDEFINED");
        } else {
          document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
          booking = $scope.$new();
          var compiledDirective;
          $scope.clickOnTimapant = {
            nafn: b.name,
            staffId: b.person_id,
            date: dagatalFactory.dags(new Date(date)),
            startTime: dagatalFactory.dags(new Date(date), t),
            endTime: dagatalFactory.dags(new Date(date), '18:00')
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
        console.log("BUTTON_CLICK");
      };
      // END OF BOOKING CLICK
      
    }]);
})();
