'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function(Database,$location,User,$scope, $state) {
    $scope.$state = $state;
    $scope.logout = function(){
        User.clearMe();
        $location.path('/login');
    }

   /*   var chatRef = Database.chat_ref
      console.log(chatRef);
      // Create a Firechat instance
      var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

      // Set the Firechat user
       chat.setUser(User.me().uid, "Ross");*/
    
  });
