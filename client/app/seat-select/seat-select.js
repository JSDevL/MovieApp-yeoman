'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/seat-select', {
        template: '<seat-select></seat-select>'
        // authenticate: 'user'
      });
  });
