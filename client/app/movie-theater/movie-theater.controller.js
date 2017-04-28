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
    this.theatersList = []

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
    console.log(this.dates);
    console.log(this.times);
    this.$http.post('/api/movie-theater-endpoints', {
      cityName: this.cityName,
      movie: {
        name: this.movieName,
        theater: {
          name: this.theaterName,
          dates: this.dates,
          times: this.times
        }
      }
    });
  }

}

angular.module('movieAppApp')
  .component('movieTheater', {
    templateUrl: 'app/movie-theater/movie-theater.html',
    controller: MovieTheaterComponent,
    controllerAs: 'movieTheaterCtrl'
  });

})();
