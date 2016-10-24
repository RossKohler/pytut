angular.module('yapp')
  .controller('TasksCtrl', function($location,$scope, $state, User) {

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

        if($scope.exercise =="1")
        {
          $scope.tabs = {

              "1" : "exercise1task1",
              "2" : "exercise1task2",
              "3" : "exercise1task3"
          }
        }
        else {
          $scope.tabs = {
              "1" : "exercise2task1",
              "2" : "exercise2task2",
              "3" : "exercise2task3"
          }
        }

        

        $scope.clicked = function (q){
          User.updateCurrent($scope.exercise,q);$location.path('/dashboard/tasks/'+User.currentEx());
          $location.path('/dashboard/tasks/'+User.currentEx());
        };

$scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};
})

