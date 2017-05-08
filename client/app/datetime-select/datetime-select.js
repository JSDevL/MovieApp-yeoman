'use strict';

angular.module('movieAppApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/datetime-select', {
        template: '<datetime-select></datetime-select>'
      });
  });
