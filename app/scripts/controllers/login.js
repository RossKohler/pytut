'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location,User) {
      $scope.data = "";



    $scope.submit = function(email, password) {
      $scope.isLoading = true;
      User.login(email,password).then(function(data){
        $scope.isLoading = false;
              if (data.code) {
                  $scope.data.code = data.code;
                  $scope.data.message = data.message;
              }
              else {
                console.log("DIRECTING TO DASHBOARD");
                   $location.path('/dashboard');
              }
    });


    }

  });
