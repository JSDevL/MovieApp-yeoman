'use strict';

(function() {

  class MainController {

    constructor($http, booking) {
      this.$http = $http;
      this.movieNames = [];
      this.movieDetails = [];
      this.movie;
      this.booking = booking;
    }

    $onInit() {
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
        for(let ele of this.boundData){
          if(this.movieNames.length){
            if(this.movieNames.includes(ele.movie)===false){
              this.movieNames.push(ele.movie);
            }
          } else{
            this.movieNames = [ele.movie];
          }
        };
      });
      this.$http.get('/api/main-endpoints').then(response => {
        this.moviesData = response.data;
        for(let elem of this.moviesData){
          if(this.movieNames.includes(elem.name)){
            if(this.movieDetails.length){
              this.movieDetails.push(elem);
            } else{
              this.movieDetails = [elem];
            }
          }
        }
      });
    }

    sel(movie) {
      this.booking.myFunc.selectedMovie = movie;
      console.log(this.booking.myFunc.selectedMovie);
    }

  }

  angular.module('movieAppApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
