(function() {

  'use strict';

  angular
    .module('segoapp')
    .run(['$http', '$rootScope', '$location', 'authService', 'authManager', 'lock', function($http, $rootScope, $location, authService, authManager, lock) {

      /* Send this header with any $http request
      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      // Send this header only in post requests.
      $http.defaults.headers.post['dataType'] = 'json';
      */

      // Intercept the hash that comes back from authentication
      // to ensure the `authenticated` event fires
      lock.interceptHash();

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = authService;
      $rootScope.gluggiOpinn = false;

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      // Use the authManager from angular-jwt to check for
      // the user's authentication state when the page is
      // refreshed and maintain authentication
      authManager.checkAuthOnRefresh();

      // Listen for 401 unauthorized requests and redirect
      // the user to the login page
      authManager.redirectWhenUnauthenticated();

      // Check if user is authorized when trying to access something that need authentication
      // http://erraticdev.blogspot.is/2015/10/angular-ngroute-routing-authorization.html
      // logging helper
      $rootScope.$on("$routeChangeStart", function(evt, to, from) {
            // requires authorization?
            console.log("THAD ER AUTHORIZED!, to:", to);
            console.log("THAD ER AUTHORIZED!, from:", from);
            
            if (to.authorize === true && authService.auth()) {
                
                //$location.path("/home");
            }
            else {
                console.log("$ROUTECHANGESTART");
                $location.path("/");
            }
        });

        $rootScope.$on("$routeChangeError", function(evt, to, from, error) {
            if (error)
            {
                // redirect to login with original path we'll be returning back to
                $location
                    .path("/")
                    .search("returnTo", to.originalPath);
            }
        });
    }]);
})();
