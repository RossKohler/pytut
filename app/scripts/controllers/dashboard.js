'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($location,User,$scope, $state) {
    $scope.$state = $state;


    $scope.logout = function(){
        User.clearMe();
        $location.path('/login');
    }

  });
