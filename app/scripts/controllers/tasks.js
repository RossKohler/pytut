angular.module('yapp')
<<<<<<< HEAD
  .controller('TasksCtrl', function($scope, $state) {
        if($state.includes('task1')){
          $scope.question = "question 1";
        }
        else if($state.includes('task2')){
          $scope.question = "question 2";
        }
        else if($state.includes('task3')){
          $scope.question = "question 3";
=======
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
>>>>>>> saveWork
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

        if($scope.exercise == "1"){
          $scope.tabs = {
            "1" : "exercise1task1",
            "2" : "exercise1task2",
            "3" : "exercise1task3"
          }
        }
        else
        {
          $scope.tabs = {
            "1" : "exercise2task1",
            "2" : "exercise2task2",
            "3" : "exercise2task3"
          }
        }

        $scope.clicked = function (q){
          User.updateCurrent($scope.exercise,q);
          // if on exercise 1 task 3, must be able to go to exercise 2
        };

        $scope.change = function(ex, qu)
        {
          $scope.exercise = ex;
          $scope.question =qu;
          User.updateCurrent($scope.exercise,$scope.question);

          $scope.$apply(function(){
            $location.path('/dashboard/tasks/'+User.currentEx());
          })
        };//end change


})
