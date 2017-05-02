'use strict';

(function(){

  class MovieTheaterComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.movieName;
      this.cityName;
      this.theaterName;
      this.dates;
      this.times;
      this.theatersList = [];

      $scope.$on('$destroy', function(){
        socket.unsyncUpdates('adminViewEndpoint');
        socket.unsyncUpdates('city');
        socket.unsyncUpdates('theaterEndpoint');
      })
    }

    $onInit() {
      this.$http.get('/api/admin-view-endpoints').then(response => {
        this.moviesData = response.data;
        console.log(this.moviesData);
        this.socket.syncUpdates('adminViewEndpoint', this.moviesData);
      });
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
        console.log(this.citiesData);
        this.socket.syncUpdates('city', this.citiesData);
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.mappedData = response.data;
        console.log(this.mappedData);
        this.socket.syncUpdates('movieTheaterEndpoint', this.mappedData);
      });
    }

    getTheaters() {
      for(let city of this.citiesData){
        if(city.name===this.cityName){
          this.theatersList = city.theater;
          console.log(this.theatersList);
        }
      }
    }

    addDetails() {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      var date = new Date(this.dates).toDateString();
      var hour = addZero(new Date(this.times).getHours());
      var min = addZero(new Date(this.times).getMinutes());
      console.log(date);
      var time = hour+":"+min;
      console.log(time);
      if(this.mappedData){
        for(let map of this.mappedData){
          if(map.city===this.cityName && map.movie===this.movieName && map.theater===this.theaterName){
            console.log(map.city);
            console.log(this.cityName);
            console.log(map.movie);
            console.log(this.movieName);
            console.log(map.theater);
            console.log(this.theaterName);
            console.log(map._id);
            this.$http.put('/api/movie-theater-endpoints/' + map._id, {
              $push: {
                dates: date
              }
            });
          } else if(map.city!==this.cityName && map.movie!==this.movieName && map.theater!==this.theaterName) {
            console.log("shouldn't go here");
            this.$http.post('/api/movie-theater-endpoints', {
              city: this.cityName,
              movie: this.movieName,
              theater: this.theaterName,
              dates: date,
              times: time
            });
          }
        }
      } else{
        this.$http.post('/api/movie-theater-endpoints', {
          city: this.cityName,
          movie: this.movieName,
          theater: this.theaterName,
          dates: date,
          times: time
        });
      }
    }
  }

  angular.module('movieAppApp')
  .component('movieTheater', {
    templateUrl: 'app/movie-theater/movie-theater.html',
    controller: MovieTheaterComponent,
    controllerAs: 'movieTheaterCtrl'
  });

})();
