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
  .module('segoapp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'auth0.lock',
    'angular-jwt',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination'
  ])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', 'lockProvider', 
  function ($routeProvider, $locationProvider, $httpProvider, lockProvider) {
    // Initialization for the Lock widget
    lockProvider.init({
      clientID: 'U4WvYHgktQuwoih8m9VVrqsPmEkxghJT',
      domain: 'sego.eu.auth0.com',
      options: {
        theme: {
          logo: 'http://cdn.firespring.com/images/90349557-f83b-4af1-a134-ef1b43293823.png',//'http://cdn2-www.playstationlifestyle.net/assets/uploads/2012/10/Sega.jpg',
          primaryColor: '#d8d8d8',
          authButtons: {
            connectionName: {
              displayName: ".Sego.",
              primaryColor: "black",
              foregroundColor: "#d8d8d8",
              icon: "http://cdn1-www.craveonline.com/assets/mandatory/legacy/2016/08/man_file_1112579_horsepoopstartsfire.jpg"
            }
          }
        }
      }
    });

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl:  '../views/main.html'
      })
      .when('/home', {
        templateUrl:  '../views/home.html',
        controller:   'HomeCtrl',
        controllerAs: 'home',
        authorize: true,
      })
      .when('/admin', {
        templateUrl:  '../views/admin.html',
        controller:   'AdminCtrl',
        controllerAs: 'admin',
        authorize: true,
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
