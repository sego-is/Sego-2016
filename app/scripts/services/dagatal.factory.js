(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', ['$rootScope', function ($rootScope) {

        var months = [
             {'full': 'janúar','dagar':31},{'full': 'febrúar','dagar':28},{'full': 'mars','dagar':31},{'full': 'apríl','dagar':30},
             {'full': 'maí','dagar':31},{'full': 'júní','dagar':30},{'full': 'júlí','dagar':31},{'full': 'ágúst','dagar':31},
             {'full': 'september','dagar':30},{'full': 'október','dagar':31},{'full': 'nóvember','dagar':30},{'full': 'desember','dagar':31}];

        var dagar = [
            {'short': 'sun','full': 'sunnudagur'},
            {'short': 'mán','full': 'mánudagur'},
            {'short': 'þri','full': 'þriðjudagur'},
            {'short': 'mið','full': 'miðvikudagur'},
            {'short': 'fim','full': 'fimmtudagur'},
            {'short': 'fös','full': 'föstudagur'},
            {'short': 'lau','full': 'laugardagur'}];

    	return {
            dagsetning: function(day, date, month) {
                return " " + dagar[day].full +  " " + date + ". " + months[month].full + "";
            }
    	};

    }]);
})();
