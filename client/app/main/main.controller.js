'use strict';

(function() {

  class MainController {

    constructor($http, booking) {
      this.$http = $http;
      this.movieNames = [];
      this.movieDetails = [];
      this.movie;
      this.cityName;
      this.booking = booking;

    }

    $onInit() {
      $('#myModal').modal();
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
        // this.socket.syncUpdates('city', this.citiesData);
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
      });
      this.$http.get('/api/movie-endpoints').then(response => {
        this.moviesData = response.data;
      });
    }

    rate() {
      $("#rateYo").rateYo({
        rating: 3.6,
        starWidth: "20px"
      });
    }

    selCity() {
      $('#myModal').modal('hide');
      for(let ele of this.boundData){
        if(ele.city===this.cityName){
          if(this.movieNames.includes(ele.movie)===false){
            this.movieNames.push(ele.movie);
          }
        }
      }

      for(let elem of this.moviesData){
        if(this.movieNames.includes(elem.name)){
          if(this.movieDetails.length){
            this.movieDetails.push(elem);
          } else{
            this.movieDetails = [elem];
          }
        }
      }
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
