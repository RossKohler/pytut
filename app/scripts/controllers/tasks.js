angular.module('yapp')
  .controller('TasksCtrl', function($scope, $state, User) {
        if($state.includes('exercise1task1')){
          $scope.question = "1";
          $scope.functionName = "wordRectangle"
          $scope.exercise = "1";
        }
        else if($state.includes('exercise1task2')){
          $scope.question = "2";
          $scope.functionName = "canVote"
          $scope.exercise = "1";
        }
        else if($state.includes('exercise1task3')){
          $scope.question = "3";
          $scope.functionName = "calculator"
          $scope.exercise = "1";
        }
        else if($state.includes('exercise2task1')){
          $scope.question = "1";
          $scope.functionName = "e2t1"
          $scope.exercise = "2";
        }
        else if($state.includes('exercise2task2')){
          $scope.question = "2";
          $scope.functionName = "e2t2"
          $scope.exercise = "2";
        }
        else if($state.includes('exercise2task3')){
          $scope.question = "3";
          $scope.functionName = "e2t3"
          $scope.exercise = "2";
        }

        $scope.clicked = function (ex, q){
          User.updateCurrent(ex,q);
        };



})
