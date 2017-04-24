'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin-view', {
        template: '<admin-view></admin-view>'
      });
  });
