'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($window, Database, $location, User, $scope, $state) {
    $scope.$state = $state;
    $scope.logout = function () {
      User.clearMe();
      $location.path('/login');
    }

    var chatRef = Database.chat_ref

    console.log(chat);
    var username = User.me().email.split('@')[0];
    
    var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
    chat.setUser(User.me().uid, username);

    var roomName = "Tutor help ("+User.me().uid.substring(0,3)+")";
    var firechat = new Firechat(chatRef, {});     
    firechat.setUser(User.me().uid,username,function(){ 
      if (User.me().email != "rossdkohler@gmail.com" && User.me().email != "carlakirkcohen@gmail.com") {
        console.log(User.myProfile());
        if (User.myProfile().roomId == null) {
          console.log("CREATING ROOM");
          firechat.createRoom(roomName, "private", function (roomId) {
            firechat.getUsersByRoom(roomId, function (userList) {
              
              if (userList["PwBPcW13MJfdN9qqbOFvNyGR7yb2"] == null) {
                firechat.inviteUser("PwBPcW13MJfdN9qqbOFvNyGR7yb2", roomId)
                console.log("Carla Invited")
              }
              if (userList["xWriKiWWiIUehfZyt1ptQfuJ76A2"] == null) {
                firechat.inviteUser("xWriKiWWiIUehfZyt1ptQfuJ76A2", roomId)
                 console.log("Ross Invited")
              }
            });
            firechat.enterRoom(roomId);
            User.setRoom(roomId);
          });
        }
        else{
          console.log("ENTERING EXISTING ROOM")
          firechat.enterRoom(User.myProfile().roomId)
        }
      }
  })  
    });

