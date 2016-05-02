var eCtrl = angular.module('eCtrl', []);
eCtrl.controller('homeCtrl', ['$scope', 'homeService',
    function($scope, homeService) {
        'use strict';
        console.log('homeCtrl called');
        homeService.sayHello().then(function(res) {
            console.log(res);
        });
    }
]);
eCtrl.controller('mainController', ['$scope','$http', function($scope,$http) {
	console.log('main controller');
   $scope.formData = {};
    $scope.hidecontent=function(){
        $scope.showform=false;
    };
    $scope.showcontent=function(){
        $scope.showform=true;
    };

   if(localStorage.getItem('user')!= null){
    $scope.user  =angular.fromJson(localStorage.getItem('user'));
    $scope.center = $scope.user.center.split(',');
    $scope.formData.pcenter =$scope.center[0];
    
   }else{
        window.location.assign("/login");
   }
    $scope.createTodo = function() {
        $http.post('/registerStaff', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                alert(data.message);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.logout = function() {
        $http.get('/logout',{headers: {'token': angular.fromJson(localStorage.getItem('user')).token}})
            .success(function(data) {
                 localStorage.removeItem('user');
                 window.location.assign("/");
                 console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}]);
eCtrl.controller('loginController', ['$scope','$http', function($scope,$http) {
	console.log('Login controller');

}]);
