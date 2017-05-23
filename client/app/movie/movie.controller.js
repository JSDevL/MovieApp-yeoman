'use strict';

(function(){

class MovieComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.moviesData = [];
    this.newMovie = [];
    this.movieInput=false;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movie');
    });
  }

  $onInit() {
    this.$http.get('/api/movie-endpoints').then(response => {
      this.moviesData = response.data;
      this.socket.syncUpdates('movieEndpoint', this.moviesData);
    });
  }

  addMovie() {
    this.$http.post('/api/movie-endpoints', {
      name: this.newMovie.Title,
      genre: this.newMovie.Genre,
      date: this.newMovie.Released,
      poster: this.newMovie.Poster
    });
    this.movieInput = false;
  }

  deleteMovie(movie) {
    this.$http.delete('/api/movie-endpoints/' + movie._id);
  }

  searchMovie(title) {
    this.$http.get('http://api.myapifilms.com/imdb/idIMDB?title='+title+'&token=ee3bf259-126b-4104-805d-6b39cd626313').then(response => {
      this.newMovie = response.data;
      console.log(this.newMovie);
      if(this.newMovie){
        this.title = '';
        this.movieInput = true;
        document.getElementById("searchButton").value = "";
      }
    });
  }

}

angular.module('movieAppApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent,
    controllerAs: 'movieCtrl'
  });

})();
