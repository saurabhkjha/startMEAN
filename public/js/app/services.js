 /* Services */
 var eService = angular.module('eService', []);
 eService.service('homeService', ["$http", "$q",
     function($http, $q) {
         'use strict';
         this.sayHello = function() {
             return $http.get('/hello');
         };
     }
 ]);