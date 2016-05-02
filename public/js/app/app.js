/* App Module */
angular.module('emanage', ['ui.router', 'eCtrl', 'eService']);
angular.module('emanage').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        'use strict';
        // For any unmatched url, redirect to /login
        $urlRouterProvider.otherwise("/login");
        // Now set up the states
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: 'homeCtrl'
        }).state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'loginController'
        }).state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            controller: 'mainController'
        });
    }
]);
angular.module('emanage').run(['$rootScope', '$location', '$state',
    function($rootScope, $location, $state) {
        'use strict';
        console.log('app run');
    }
]);
window.onload = function() {
    'use strict';
    angular.bootstrap(document, ["emanage"]);
};