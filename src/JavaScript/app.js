/**
 * Created by StefánIngi on 09/26/2016.
 */
/*var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: '<h3>Its the UI-Router hello world app!</h3>'
    };

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});*/

/*jslint browser:true */
/* NewIrc + routeProvider config*/

/*
 Hér er declerationið af NewIrc
 Einnig eru hér skigreind route'in sem við notum
 í NewIrc til að beina á controllera.
 */
angular.module("NewIrc", ['ngRoute', 'luegg.directives']).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl: "src/HTML/home.html",
            controller: "HomeController"
        })
        .otherwise({
            redirectTo: "/login"
        });
    }
]);


