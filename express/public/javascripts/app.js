'use strict';

/* App Module */

var classManagerApp = angular.module('classManagerApp', [
  'ngRoute',
  // 'classManagerAnimations',
  'classManagerControllers',
  'classManagerFilters',
  'classManagerServices',
  'classManagerDirectives'
]);

classManagerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegisterCtrl'
      }).
      when('/user', {
        templateUrl: 'partials/user.html',
        controller: 'UserCtrl'
      }).
      when('/settings/user', {
        templateUrl: 'partials/settings_user.html',
        controller: 'SettingsUserCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
