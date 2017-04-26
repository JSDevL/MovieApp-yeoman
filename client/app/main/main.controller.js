'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.moviesData = [];
      this.theatersData = [];
    }

    $onInit() {
      this.$http.get('/api/main-endpoints').then(response => {
          this.moviesData = response.data;
        });
      this.$http.get('/api/theater-endpoints').then(response => {
        this.theatersData = response.data;
      });
    }
  }

  angular.module('movieAppApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
