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
               .state('task1', {
            url: '/task1',
            parent: 'tasks',
            templateUrl: 'views/tasks/task1.html'
          })
               .state('task2', {
            url: '/task2',
            parent: 'tasks',
            templateUrl: 'views/tasks/task2.html'
          })
               .state('task3', {
            url: '/task3',
            parent: 'tasks',
            templateUrl: 'views/tasks/task3.html'
          })
  }).
run(function($location,User) { 
  if(User.me()== null){
    $location.path("login");
  }
});
