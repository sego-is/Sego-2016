(function() {
  'use strict';

  angular
    .module('segoapp')
    .service('gluggaService', ['$compile', function ($compile) {
        var thisScope;
        var compiledDirective;
         
        function init(scope) {
            document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "visible";
            thisScope = scope.$new();
        };
        
        function bokaGluggi() {
            compiledDirective = $compile('<boka class="skilabod" ' +
                    'close="lokaBokun()" obj-from="clickOnTimapant"></boka>');
            var directiveElement = compiledDirective(thisScope);
            $('.skilaboda-haldari').append(directiveElement);
        };
        
        function bokunGluggi() {
            compiledDirective = $compile('<bokun class="skilabod" ' +
                    'close="lokaBokun()" obj-from="clickOnTimapant"></bokun>');
                var directiveElement = compiledDirective(thisScope);
            $('.skilaboda-haldari').append(directiveElement);
        };
        
        function verdlistiGluggi() {
            compiledDirective = $compile('<verdlisti class="skilabod" close="lokaGlugga()"></verdlisti>');
             var directiveElement = compiledDirective(thisScope);
            $('.skilaboda-haldari').append(directiveElement);
        };
        
        function stillingarGluggi() {
             compiledDirective = $compile('<stillingar class="skilabod" close="lokaGlugga()"></stillingar>');
             var directiveElement = compiledDirective(thisScope);
            $('.skilaboda-haldari').append(directiveElement);
        };
        
        function customerGluggi() {
            compiledDirective = $compile('<customer class="skilabod" close="lokaGlugga()"></customer>');
            var directiveElement = compiledDirective(thisScope);
            $('.skilaboda-haldari').append(directiveElement);
        };
        
        function destroy() {
            thisScope.$destroy;
            $('.skilaboda-haldari').empty();
            document.getElementsByClassName("skilaboda-haldari")[0].style.visibility = "hidden";
        };
        
        return {
            init: init,
            verdlistiGluggi: verdlistiGluggi,
            stillingarGluggi: stillingarGluggi,
            customerGluggi: customerGluggi,
            bokaGluggi: bokaGluggi,
            bokunGluggi: bokunGluggi,
            destroy: destroy
        };
  }]);
})();
