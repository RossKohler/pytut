angular.module('yapp')
  .controller('TasksCtrl', function($scope, $state, User, $location, $sce) {

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

        var sel =
        {
          "1" :{
            "1" : "exercise1task1",
            "2" : "exercise1task2",
            "3" : "exercise1task3"
          },
          "2": {
            "1" : "exercise2task1",
            "2" : "exercise2task2",
            "3" : "exercise2task3"
          }
        };

        $scope.tabs = sel[$scope.exercise];
        $scope.customHtml = $sce.trustAsHtml('<ul class="nav navbar-nav"><li ng-class="{active: $state.includes($scope.tabs[1])}" ng-click ="clicked(1)"><a ui-sref="$scope.tabs[1]">Question 1</a></li><li ng-class="{active: $state.includes($scope.tabs[2])}" ng-click ="clicked(2)"><a ui-sref="$scope.tabs[2]">Question 2</a></li><li ng-class="{active: $state.includes($scope.tabs[3])}" ng-click ="clicked(3)"><a ui-sref="$scope.tabs[3]">Question 3</a></li></ul>');
        console.log($scope.tabs[1]);

        $scope.clicked = function (q){
          User.updateCurrent($scope.exercise,q);
        };

        $scope.change = function(ex, qu)
        {

          $scope.exercise = ex;
          $scope.question =qu;

          $scope.tabs = sel[$scope.exercise];
          console.log($scope.tabs);

          $scope.customHtml = $sce.trustAsHtml('<ul><li>render me please</li></ul>');
          //console.log($scope.tabs);

          User.updateCurrent($scope.exercise,$scope.question);

          $location.path('/dashboard/tasks/'+User.currentEx());
          //$scope.$apply(function(){
          //  $location.path('/dashboard/tasks/'+User.currentEx());
          //})
        };//end change


})
