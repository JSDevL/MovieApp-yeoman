'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movie-theater', {
        template: '<movie-theater></movie-theater>'
        // authenticate: 'admin'
      });
  });
