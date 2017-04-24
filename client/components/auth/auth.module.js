'use strict';

angular.module('movieAppApp.auth', ['movieAppApp.constants', 'movieAppApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
