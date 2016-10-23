angular.module('yapp')

  .controller('TasksCtrl', function($location,$scope, $state, User) {

        if($state.includes('excercise1task1')){
          $scope.question = "1";
          $scope.functionName = "wordRectangle"
          $scope.excercise = "1";
        }
        else if($state.includes('excercise1task2')){
          $scope.question = "2";
          $scope.functionName = "canVote"
          $scope.excercise = "1";
        }
        else if($state.includes('excercise1task3')){
          $scope.question = "3";
          $scope.functionName = "calculator"
          $scope.excercise = "1";
        }
        else if($state.includes('excercise2task1')){
          $scope.question = "1";
          $scope.functionName = "e2t1"
          $scope.excercise = "2";
        }
        else if($state.includes('excercise2task2')){
          $scope.question = "2";
          $scope.functionName = "e2t2"
          $scope.excercise = "2";
        }
        else if($state.includes('excercise2task3')){
          $scope.question = "3";
          $scope.functionName = "e2t3"
          $scope.excercise = "2";
        }

        if($scope.excercise == "1"){
          $scope.tabs = {
            "1" : "excercise1task1",
            "2" : "excercise1task2",
            "3" : "excercise1task3"
          }
        }
        else
        {
          $scope.tabs = {
            "1" : "excercise2task1",
            "2" : "excercise2task2",
            "3" : "excercise2task3"
          }
        }

        $scope.clicked = function (q){
          User.updateCurrent($scope.excercise,q);
          // if on excercise 1 task 3, must be able to go to excercise 2
        };

        $scope.change = function(ex, qu)
        {
          $scope.excercise = ex;
          $scope.question =qu;
          User.updateCurrent($scope.excercise,$scope.question);

          $scope.safeApply(function(){
            $location.path('/dashboard/tasks/'+User.currentEx());
          })
        };//end change

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

