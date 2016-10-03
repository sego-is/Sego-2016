

/*jslint browser:true */
/* NewIrc + routeProvider config*/


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


