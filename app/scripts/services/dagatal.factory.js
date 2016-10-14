(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', ['$rootScope', function ($rootScope) {
        
        var i, j, WEEK_IN_MONTH = 6, DAYS_IN_WEEK = 7;
        var dagatalid = [];
        var dayToday = new Date();
        
        var options = {
            today: new Date(),
            selectedYear: 0,
            selectedMonth: 0,
            selectedDate: 0,
            selectedDay: 0
        }
        
        function refreshOptions() {
            options.selectedMonth = dayToday.getMonth();
    	   options.selectedDate = dayToday.getDate();
            options.selectedYear = dayToday.getFullYear();
            options.selectedDay = dayToday.getDay();
        }
        refreshOptions();
       
    	console.log(options);
    	
        var lastDayOfLastMonth = new Date();
    	lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() - dayToday.getDate());
        
    	var dayNumberOfWeek = lastDayOfLastMonth.getDay();
        var lastDateOfLastMonthANDtmp = lastDayOfLastMonth.getDate();
        

        
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
        
        
        for (i = 0; i < WEEK_IN_MONTH; i++) {
            for (j = 0; j < DAYS_IN_WEEK; j++) {
            	if (i === 0) {
            		 if ((j+1) === dayNumberOfWeek) {
            		 	dagatalid.push(lastDateOfLastMonthANDtmp);
            		 	lastDateOfLastMonthANDtmp = 1;
            		 }
            		 else if ((j+1) > dayNumberOfWeek) {
            		 	dagatalid.push(lastDateOfLastMonthANDtmp);
            		 	lastDateOfLastMonthANDtmp += 1;
            		 }else {
                        dagatalid.push(lastDateOfLastMonthANDtmp-dayNumberOfWeek+j+1);
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

    	return {
    		dagatal: function() {
                
    			return dagatalid;
    		},
            dagsetning: " " + dagar[options.selectedDay-1].full +  " " + options.selectedDate + ". " + months[options.selectedMonth].full + "",
            breytaDagsetningu: function(a) {
                dayToday.setDate(a);
                refreshOptions();
            }
    	}

    }]);
})();
