(function() {
  'use strict';

  angular
    .module('segoapp')
    .service('authService', ['$rootScope', '$location', 'lock', 'authManager', 'backendFactory', function ($rootScope, $location, lock, authManager, backendFactory) {


    var userProfile = localStorage.getItem('profile') || {};
    var authenticated = false;


    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      authManager.unauthenticate();
      userProfile = {};
      $location.path('/');
      authenticated = false;
    }

    function auth() {
      return authenticated;
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function(authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        authenticated = true;

        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }
          $location.path('/home');
          localStorage.setItem('profile', JSON.stringify(profile));
          $rootScope.$broadcast('userProfileSet', profile);
        });
        
        
      });
    }

    return {
      userProfile: userProfile,
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      auth: auth
    };
  }]);
})();
