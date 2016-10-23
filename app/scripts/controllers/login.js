'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function ($scope, $location, User,$analytics) {
    $scope.data = { code: "", message: "" };
    $scope.isLoading = false;


    $scope.submit = function (email, password) {
      $scope.isLoading = true;
      User.login(email, password).then(function (data) {

        if (data.code) {
          console.log("Hello")
          $scope.$apply(function () {
            $scope.data = { code: data.code, message: data.message }
             $scope.isLoading = false;
          })
          //$scope.data.code = data.code;
          //$scope.data.message = data.message;

          console.log(data.code);
          console.log(data.message);
        }
        else {
          console.log("DIRECTING TO DASHBOARD");
          $analytics.setUsername(User.me().uid);
          User.initMyProfile(function(){
                    $scope.$apply(function () {
                      $location.path('/dashboard/tasks/task1');
          })
        });

        }
      });


    }

  });
