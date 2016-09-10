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
    'starter.services'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

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
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('introduction', {
            url: '/introduction',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/introduction.html'
          })
            .state('selectionSort', {
            url: '/selectionSort',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/selectionSort.html'
          })
            .state('mergeSort', {
            url: '/mergeSort',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/mergeSort.html'
          })
            .state('linearSearch', {
            url: '/linearSearch',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/linearSearch.html'
          })
            .state('binarySearch', {
            url: '/binarySearch',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/binarySearch.html'
          })
          .state('contactus', {
            url: '/contactus',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/contactus.html'
          })


  });
