(function() {

  'use strict';

  angular
    .module('segoApp')
    .run(['$rootScope', '$location', 'authService', 'authManager', 'lock', function($rootScope, $location, authService, authManager, lock) {
      
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
      function getPath(route) {
          if (!!route && typeof(route.originalPath) === "string") {
            return "'" + route.originalPath + "'";
          }   
          return "[unknown route, using otherwise]";
      }
            
      $rootScope.$on("$routeChangeStart", function(evt, to, from){
        console.log("Route change start from", getPath(from), "to", getPath(to));
        if (to.authorize === true) {
            if (authService.auth()) {
                $location.path('/home');
            }
            else {
                $location.path('/');
            }
/*
              console.log("Resolving authorization.");
              console.log("authService.userProfile:", authService.userProfile);
              return authService.login();
*/
          }
          
      });
            
      $rootScope.$on("$routeChangeError", function(evt, to, from, error){
          console.log("Route change ERROR from", getPath(from), "to", getPath(to), error);
          if (error instanceof AuthorizationError) {
            console.log("Redirecting to main", error);
            $location.path("/").search("returnTo", to.originalPath);
          }
      });
            
      // NOT needed in authorization / logging purposes only
      $rootScope.$on("$routeChangeSuccess", function(evt, to, from){
          console.log("Route change success from", getPath(from), "to", getPath(to));
      });
    }]);
})();