'use strict';

(function() {

  class MainController {

    constructor($http, $scope) {
      this.$http = $http;
      this.moviesData = [{
        name: "hello"
      }];
    }

    $onInit() {
      this.$http.get('/api/main-endpoints').then(response => {
          this.moviesData = response.data;
          console.log(this.moviesData);
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
