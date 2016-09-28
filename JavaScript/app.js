/**
 * Created by StefánIngi on 09/26/2016.
 */
var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(function($stateProvider) {
    var helloState = {
        name: 'hello',
        url: '/hello',
        template: '<h3>hello world!</h3>'
    };
    var aboutState = {
        name: 'about',
        url: '/about',
        templateUrl: '../src/JavaScript/about.html'
    };

    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
});