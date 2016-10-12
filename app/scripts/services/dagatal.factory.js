(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', ['$rootScope', function ($rootScope) {

    	var dayToday = new Date();
    	var lastDayOfLastMonth = new Date();
    	var firstDayOfWeek = new Date();

    	lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() - dayToday.getDate());
    	
    	var dagurinn = lastDayOfLastMonth.getDay();
    	console.log(lastDayOfLastMonth.getDate());
    	console.log(lastDayOfLastMonth.getDay());
    	console.log(dayToday.getDate());
    	

 		var manudir = [{'full': 'janúar'},{'full': 'febrúar'},{'full': 'mars'},{'full': 'apríl'},
                {'full': 'maí'},{'full': 'júní'},{'full': 'júlí'},{'full': 'ágúst'},{'full': 'september'},
                {'full': 'október'},{'full': 'nóvember'},{'full': 'desember'}];

        var dagar = [{
            'short': 'mán',
            'full': 'mánudagur'
        },{
            'short': 'þri',
            'full': 'þriðjudagur'
        },{
            'short': 'mið',
            'full': 'miðvikudagur'
        },{
            'short': 'fim',
            'full': 'fimmtudagur'
        },{
            'short': 'fös',
            'full': 'föstudagur'
        },{
            'short': 'lau',
            'full': 'laugardagur'
        },{
            'short': 'sun',
            'full': 'sunnudagur'
        }];                
        var i, j, WEEK_IN_MONTH = 6, DAYS_IN_WEEK = 7;


        var dagatalid = [];

        for (i = 0; i < WEEK_IN_MONTH; i++) {
            for (j = 0; j < DAYS_IN_WEEK; j++) {
            	if (i === 0) {
            		 if (((j+1) === dagurinn)) {

            		 }
            		 else {
            		 	
            		 }
            	}
                else {
                	dagatalid.push(i+j);
                }
        	} 	
    	};

    	return {
    		dagatal: function() {
    			return dagatalid;
    		}
    	}

    }]);
})();
