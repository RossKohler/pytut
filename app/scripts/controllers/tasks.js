angular.module('yapp')
  .controller('TasksCtrl', function($scope, $state) {
        if($state.includes('task1')){
          $scope.question = "question 1";
          $scope.functionName = "wordRectangle"
        }
        else if($state.includes('task2')){
          $scope.question = "question 2";
          $scope.functionName = "canVote"
        }
        else if($state.includes('task3')){
          $scope.question = "question 3";
          $scope.functionName = "calculator"
        }
      
})