'use strict';


(function() {

  class MainController {

    constructor($http, Auth, booking) {
      this.$http = $http;
      this.movieNames = [];
      this.movieDetails = [];
      this.rating = 0;
      this.count = 0;
      this.avgR = 0;
      this.movie;
      this.cityName;
      this.booking = booking;
      this.currentUser = Auth.getCurrentUser().role;
      this.canRate = true;
    }

    $onInit() {
      console.log(this.currentUser);
      if(this.currentUser !== 'admin'){
        $('#myModal').modal();
      };
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
        // this.socket.syncUpdates('city', this.citiesData);
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
      });
      this.$http.get('/api/movie-endpoints').then(response => {
        console.log(response.data.name);
        console.log(this.boundData.movie);
        if(response.data.name === this.boundData.movie){
          this.moviesData = response.data;
        }
      });
      this.$http.get('/api/rating-endpoints').then(response => {
        console.log(response.data);
      });
    }

    rate() {
      var $rateYo = $("#rateYo").rateYo();
      this.rating += $rateYo.rateYo("rating");
      this.count++;
      this.avgR = this.rating/this.count;
      console.log(this.avgR);
      if(this.avgR !== 0.00){
        this.canRate = false;
      }
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
