angular.module('yapp')
  .controller('TasksCtrl', function($scope, $state) {
        if($state.includes('task1')){
          $scope.question = "question 1";
        }
        else if($state.includes('task2')){
          $scope.question = "question 2";
        }
        else if($state.includes('task3')){
          $scope.question = "question 3";
        }
      
})