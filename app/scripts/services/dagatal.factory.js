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
            {'short': 'sun','full': 'Sunnudagur'},
            {'short': 'mán','full': 'Mánudagur'},
            {'short': 'þri','full': 'Þriðjudagur'},
            {'short': 'mið','full': 'Miðvikudagur'},
            {'short': 'fim','full': 'Fimmtudagur'},
            {'short': 'fös','full': 'Föstudagur'},
            {'short': 'lau','full': 'Laugardagur'}];

        // Initialize the time (clock) in booking for the day
      var stillingar = {
        upphafsTimi: 3600 * 7,
        endaTimi:    3600 * 22,
        lotan:       900
      };

      var times = [];

      var initTimes = function () {
        var i;
        for (i = stillingar.upphafsTimi; i <= stillingar.endaTimi; i += stillingar.lotan) {
          times.push(toHHMMSS(i));
        }
      };
      initTimes();

      // END OF INITIALIZE TIME
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
            dagsetning: function(d) {
                if (d === undefined) {
                    return " " + dagar[dagsetningValinn.getDay()].full +  " " + dagsetningValinn.getDate() + ". " + months[dagsetningValinn.getMonth()].full + "";
                }
                else {
                    return " " + dagar[d.getDay()].full +  " " + d.getDate() + ". " + months[d.getMonth()].full + "";
                }
            },
            aMorgun: function() {
                dagsetningValinn.setDate(dagsetningValinn.getDate() + 1);
                //return this.dagsetning(dagsetningValinn.getDay(), dagsetningValinn.getDate(), dagsetningValinn.getMonth());
            },
            iGaer: function() {
                dagsetningValinn.setDate(dagsetningValinn.getDate() - 1);
                //return this.dagsetning(dagsetningValinn.getDay(), dagsetningValinn.getDate(), dagsetningValinn.getMonth());
            },
            timasetning: function(a) {
                if (a === undefined) {
                    return toHHMMSS(0)
                }
                else {
                    return toHHMMSS(a);
                }
            },
            timabokanir: function(lota) {
                if (lota === undefined) {
                    return times;
                }
                else {
                    // STYTTA EDA LENGJA I LOTU
                }
            },
            dags: function(d, t) {
                if (d === undefined) {
                    d = new Date();
                }
                if (t == undefined) {
                    t = "00:00:00";
                }
                var date = d.getDate();
                var month = d.getMonth()+1;

                if (month < 10) { month = "0" + month; }
                if (date < 10) { date = "0" + date; }
                return d.getFullYear() + "-" + month + "-" + date + "T" + t;
            },
            getHHMMfromDate: function(d) {
                var HH = d.getHours();
                var MM = d.getMinutes();

                if (HH   < 10) {HH   = "0"+HH;}
                if (MM < 10) {MM = "0"+MM;}

                return HH + ":" + MM;

            },
            getDate: function() {
                return dagsetningValinn;
            },
            setDate: function(d) {
                dagsetningValinn = new Date(d);
            }
    	};

    });
})();
