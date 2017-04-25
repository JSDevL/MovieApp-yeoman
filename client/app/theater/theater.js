'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/theater', {
        template: '<theater></theater>'
      });
  });
