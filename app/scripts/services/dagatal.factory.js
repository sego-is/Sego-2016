(function() {
  'use strict';

  angular
    .module('segoApp')
    .factory('dagatalFactory', function () {

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
        
        var dagsetningValinn = new Date();
        
        function toHHMMSS(a) {
            var sec_num = parseInt(a, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            return hours + ":" + minutes;
        }
        
    	return {
            dagsetning: function(day, date, month) {
                if (day === undefined) {
                    return " " + dagar[dagsetningValinn.getDay()].full +  " " + dagsetningValinn.getDate() + ". " + months[dagsetningValinn.getMonth()].full + "";
                }
                else {
                    return " " + dagar[day].full +  " " + date + ". " + months[month].full + "";
                }
            },
            aMorgun: function() {
                dagsetningValinn.setDate(dagsetningValinn.getDate() + 1);
                return this.dagsetning(dagsetningValinn.getDay(), dagsetningValinn.getDate(), dagsetningValinn.getMonth());
            },
            iGaer: function() {
                dagsetningValinn.setDate(dagsetningValinn.getDate() - 1);
                return this.dagsetning(dagsetningValinn.getDay(), dagsetningValinn.getDate(), dagsetningValinn.getMonth());
            },
            timasetning: function(a) {
                if (a === undefined) {
                    return toHHMMSS(0)
                }
                else {
                    return toHHMMSS(a);
                }
            },
            dags: function(d, t) {
                if (d === undefined || t == undefined) {
                    d = new Date();
                    t = "00:00:00";
                }
                var month = d.getMonth()+1;
                var date = d.getDate();
                
                if (month < 10) { month = "0" + month; }
                if (date < 10) { date = "0" + date; }
                console.log(t);
                return d.getFullYear() + "-" + month + "-" + date + "T" + t;
            }
    	};

    });
})();
