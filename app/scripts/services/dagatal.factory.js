(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', ['$rootScope', function ($rootScope) {
        
        var i, j, WEEK_IN_MONTH = 6, DAYS_IN_WEEK = 7;
        var dagatalid = [];
        var dayToday = new Date();
        
        var months = [
             {'full': 'janúar','dagar':31},{'full': 'febrúar','dagar':28},{'full': 'mars','dagar':31},{'full': 'apríl','dagar':30},
             {'full': 'maí','dagar':31},{'full': 'júní','dagar':30},{'full': 'júlí','dagar':31},{'full': 'ágúst','dagar':31},
             {'full': 'september','dagar':30},{'full': 'október','dagar':31},{'full': 'nóvember','dagar':30},{'full': 'desember','dagar':31}];
        
        var dagar = [
            {'short': 'mán','full': 'mánudagur'},
            {'short': 'þri','full': 'þriðjudagur'},
            {'short': 'mið','full': 'miðvikudagur'},
            {'short': 'fim','full': 'fimmtudagur'},
            {'short': 'fös','full': 'föstudagur'},
            {'short': 'lau','full': 'laugardagur'},
            {'short': 'sun','full': 'sunnudagur'}];   

        var options = {
            today: new Date(),
            selectedYear: 0,
            selectedMonth: 0,
            selectedDate: 0,
            selectedDay: 0
        };
        
        function refreshOptions() {
            options.selectedMonth = dayToday.getMonth();
            options.selectedDate = dayToday.getDate();
            options.selectedYear = dayToday.getFullYear();
            options.selectedDay = dayToday.getDay();
            /*$rootScope.$broadcast('breyta-dagsetningu');*/
        };

        function createMonth() {

            var lastDayOfLastMonth;
            if ((options.selectedMonth - 1) < 0) {
                lastDayOfLastMonth = months[11].dagar;
            }
            else if ((options.selectedMonth - 1) > 11) {
                lastDayOfLastMonth = months[0].dagar;
            }
            else {
                lastDayOfLastMonth = months[options.selectedMonth-1].dagar;
            }

            var dayNumberOfWeek = options.selectedDay;

            var lastDateOfLastMonthANDtmp = lastDayOfLastMonth;

            for (i = 0; i < WEEK_IN_MONTH; i++) {
                for (j = 0; j < DAYS_IN_WEEK; j++) {
                    if (i === 0) {
                         if ((j+1) === options.selectedDay) {
                            dagatalid.push(lastDateOfLastMonthANDtmp);
                            lastDateOfLastMonthANDtmp = 1;
                         }
                         else if ((j+1) > options.selectedDay) {
                            dagatalid.push(lastDateOfLastMonthANDtmp);
                            lastDateOfLastMonthANDtmp += 1;
                         }else {
                            dagatalid.push(lastDateOfLastMonthANDtmp-options.selectedDay+j+1);
                         }
                    }
                    else {
                        if (lastDateOfLastMonthANDtmp > months[options.selectedMonth].dagar) {
                            lastDateOfLastMonthANDtmp = 1;
                        }
                        dagatalid.push(lastDateOfLastMonthANDtmp);
                        lastDateOfLastMonthANDtmp += 1;
                    }
                }   
            };
        };

        
        refreshOptions();
        createMonth();

    	return {
    		dagatal: dagatalid,
            dagsetning: function() {
                return " " + dagar[options.selectedDay].full +  " " + options.selectedDate + ". " + months[options.selectedMonth].full + "";
            },
            breytaDagsetningu: function(a) {
                dayToday.setDate(a);
                refreshOptions();
                
            },
            breytaMan: function(a) {
                dayToday.setMonth(options.selectedMonth+a);
                refreshOptions();
                createMonth();
                console.log("HERNA");
            },
            uppfaera: function() {
                refreshOptions();
                createMonth();
            },
            getMan: function() {
                return months[options.selectedMonth].full;
            },
            getDags: function() {
                return dagar[options.selectedDate];
            },
            getAr: function() {
                return options.selectedYear;
            }
    	};

    }]);
})();
