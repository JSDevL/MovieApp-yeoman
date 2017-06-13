'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/receipt', {
        template: '<receipt></receipt>'
        // authenticate: 'user'
      });
  });
