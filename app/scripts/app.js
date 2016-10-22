'use strict';

/**
 * @ngdoc overview
 * @name segoEnnOgAfturApp
 * @description
 * # segoEnnOgAfturApp
 *
 * Main module of the application.
 */
angular
  .module('segoApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'auth0.lock',
    'angular-jwt',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', 'lockProvider', 'jwtOptionsProvider', 'jwtInterceptorProvider', function ($routeProvider, $locationProvider, $httpProvider, lockProvider, jwtOptionsProvider, jwtInterceptorProvider) {
    // Initialization for the Lock widget
    lockProvider.init({
      clientID: 'U4WvYHgktQuwoih8m9VVrqsPmEkxghJT',
      domain: 'sego.eu.auth0.com',
      options: {
          theme: {
              logo: 'http://cdn2-www.playstationlifestyle.net/assets/uploads/2012/10/Sega.jpg',
              primaryColor: 'white',
              authButtons: {
                connectionName: {
                    displayName: ".Sego.", 
                    primaryColor: "black", 
                    foregroundColor: "white", 
                    icon: "http://cdn1-www.craveonline.com/assets/mandatory/legacy/2016/08/man_file_1112579_horsepoopstartsfire.jpg"
                }
                }
          }  
      }
    });

      // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/'
    });

    // Add the jwtInterceptor to the array of HTTP interceptors
    // so that JWTs are attached as Authorization headers
    $httpProvider.interceptors.push('jwtInterceptor');
    
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: '../views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
        authorize: true /* TRUE */
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
