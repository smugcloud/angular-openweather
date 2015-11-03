'use strict';

// Declare app level module which depends on filters, and services
angular.module('openWeatherApp', [
  'ngRoute',
  'openWeatherApp.filters',
  'openWeatherApp.services',
  'secrets.services',
  'openWeatherApp.directives',
  'openWeatherApp.controllers',
  "iso-3166-country-codes"
  //"crunchinatorApp.directives"
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forecast', {templateUrl: 'partials/forecast.html', controller: 'OpenWeatherCtrl'});
  $routeProvider.when('/storm', {templateUrl: 'partials/storm.html', controller: 'OpenWeatherCtrl'});
  $routeProvider.otherwise({redirectTo: '/forecast'});
}]);
