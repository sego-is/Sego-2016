

/*jslint browser:true */
/* NewIrc + routeProvider config*/

/*
 Hér er declerationið af NewIrc
 Einnig eru hér skigreind route'in sem við notum
 í NewIrc til að beina á controllera.
 */
angular.module("sego", ['ngRoute', 'luegg.directives']).config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when("/home", {
            templateUrl: "src/HTML/home.html",
            controller: "HomeController"
        })
        .otherwise({
            redirectTo: "src/HTML/login.html"
        });
    }
]);


