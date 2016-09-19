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
<<<<<<< HEAD
            templateUrl: 'views/tasks/task1.html',
=======
            templateUrl: 'views/tasks/task1.html'
>>>>>>> 6e1a33a4cfaa443f67797e68fe6cc7896443fbfc
          })
               .state('task2', {
            url: '/task2',
            parent: 'tasks',
<<<<<<< HEAD
            templateUrl: 'views/tasks/task2.html',
=======
            templateUrl: 'views/tasks/task2.html'
>>>>>>> 6e1a33a4cfaa443f67797e68fe6cc7896443fbfc
          })
               .state('task3', {
            url: '/task3',
            parent: 'tasks',
<<<<<<< HEAD
            templateUrl: 'views/tasks/task3.html',

=======
            templateUrl: 'views/tasks/task3.html'
>>>>>>> 6e1a33a4cfaa443f67797e68fe6cc7896443fbfc
          })
  }).
run(function($location,User) { 
  if(User.me()== null){
    $location.path("login");
  }
});
