'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($window,Database,$location,User,$scope, $state) {
    $scope.$state = $state;
    $scope.logout = function(){
        User.clearMe();
        $location.path('/login');
    }

  var chatRef = Database.chat_ref
  var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
  var username = User.me().email.split('@')[0];
  chat.setUser(User.me().uid, username);
  console.log(chat);
  
  var firechat = new Firechat(chatRef,{});
  firechat.setUser(User.me().uid, username, function(){
     if(User.me().email != "rossdkohler@gmail.com" && User.me().email != "carlakirkcohen@gmail.com"){
  firechat.createRoom("Task Help","private",function(roomId){
    console.log(roomId);
    firechat.getUsersByRoom(roomId, function(userList){
      console.log(userList);
      if(Object.keys(userList).length === 0 || userList.indexOf("PwBPcW13MJfdN9qqbOFvNyGR7yb2") == -1 ){
        firechat.inviteUser("PwBPcW13MJfdN9qqbOFvNyGR7yb2", roomId)
      }
      if(Object.keys(userList).length === 0 || userList.indexOf("xWriKiWWiIUehfZyt1ptQfuJ76A2") == -1){
            firechat.inviteUser("xWriKiWWiIUehfZyt1ptQfuJ76A2", roomId)
      }
    });
    firechat.enterRoom(roomId);
  });
 }
  });
  });

