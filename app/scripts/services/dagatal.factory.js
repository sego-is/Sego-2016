(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', ['$rootScope', function ($rootScope) {
        
        var i, j, WEEK_IN_MONTH = 6, DAYS_IN_WEEK = 7;
        var dagatalid = [];
        
    	var dayToday = new Date();
    	
        var lastDayOfLastMonth = new Date();
    	lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() - dayToday.getDate());
        
    	var dayNumberOfWeek = lastDayOfLastMonth.getDay();
        var lastDateOfLastMonthANDtmp = lastDayOfLastMonth.getDate();
        
        var selectedMonth = dayToday.getMonth();
    	var selectedDate = dayToday.getDate();
        var selectedYear = dayToday.getFullYear();
        var selectedDay = dayToday.getDay();
        
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
                    if (lastDateOfLastMonthANDtmp > months[selectedMonth].dagar) {
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
            dagsetning: " " + dagar[selectedDay-1].full +  " " + selectedDate + ". " + months[selectedMonth].full + ""
    	}

    }]);
})();
