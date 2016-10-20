'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'starter.services',
    'ui.ace',
    'angulartics',
    'angulartics.google.analytics',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/dashboard', '/dashboard/tasks');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('tasks', {
            url: '/tasks',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/tasks.html',
            controller: 'TasksCtrl'
          })
             .state('contactus', {
            url: '/contactus',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/contactus.html'
          })
               .state('exercise1task1', {
            url: '/exercise1task1',
            parent: 'tasks',
            templateUrl: 'views/tasks/exercise1task1.html',
            controller: 'TasksCtrl'
          })
               .state('exercise1task2', {
            url: '/exercise1task2',
            parent: 'tasks',
            templateUrl: 'views/tasks/exercise1task2.html',
            controller: 'TasksCtrl'
          })
               .state('exercise1task3', {
            url: '/exercise1task3',
            parent: 'tasks',
            templateUrl: 'views/tasks/exercise1task3.html',
            controller: 'TasksCtrl'
          })
          .state('exercise2task1', {
       url: '/exercise2task1',
       parent: 'tasks',
       templateUrl: 'views/tasks/exercise2task1.html',
       controller: 'TasksCtrl'
     })
          .state('exercise2task2', {
       url: '/exercise2task2',
       parent: 'tasks',
       templateUrl: 'views/tasks/exercise2task2.html',
       controller: 'TasksCtrl'
     })
          .state('exercise2task3', {
       url: '/exercise2task3',
       parent: 'tasks',
       templateUrl: 'views/tasks/exercise2task3.html',
       controller: 'TasksCtrl'
     })
  }).
run(function($location,User) {
  if(User.me()== null){
    $location.path("login");
  }
});
