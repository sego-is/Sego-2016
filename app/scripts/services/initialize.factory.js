(function () {
  'use strict';

  angular
    .module('segoapp')
    .factory('initializeFactory', ['backendFactory', '$rootScope', function (backendFactory, $rootScope) {
        return function() {
            backendFactory.init().then(function(res) {
                backendFactory.set(res.data[0]);
                $rootScope.$emit('backendFactoryInit', 'DONE');
                console.log("RESPOND FROM initializeFactory, res:", res);
            }, function(err) {
                console.log("ERROR FROM initializeFactory, err:", err);
            });
        };
    }]);
})();
