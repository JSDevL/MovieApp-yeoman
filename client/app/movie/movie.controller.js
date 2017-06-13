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
      title: this.newMovieInfo.title,
      genre: this.genre,
      date: this.newMovieInfo.release_date,
      poster: this.poster,
      plot: this.newMovieInfo.overview,
      actors: _.pluck(this.newMovieCredits.cast, 'name'),
      directors: _.pluck(_.filter(this.newMovieCredits.crew, function(member){ return member.job === "Director" }), 'name'),
      producers:_.pluck(_.filter(this.newMovieCredits.crew, function(member){ return member.job === "Producer" }), 'name'),
      language: this.language,
      runtime: this.newMovieInfo.runtime + " mins"
    });
    this.movieInput = false;
  }

  deleteMovie(movie) {
    this.$http.delete('/api/movie-endpoints/' + movie._id);
  }

  searchMovie(title) {
    this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=44bbe2a64fc1333b71c7aedd8d04ad28&query='+title).then(response => {
      this.newMovieId = response.data.results[0].id;
      console.log(response.data.results[0]);
      this.$http.get('https://api.themoviedb.org/3/movie/'+this.newMovieId+'?api_key=44bbe2a64fc1333b71c7aedd8d04ad28').then(response => {
        this.newMovieInfo = response.data;
        console.log(this.newMovieInfo);
        this.poster = 'http://image.tmdb.org/t/p/w185'+this.newMovieInfo.poster_path
      });
      this.$http.get('https://api.themoviedb.org/3/movie/'+this.newMovieId+'/credits?api_key=44bbe2a64fc1333b71c7aedd8d04ad28').then(response => {
        this.newMovieCredits = response.data;
        console.log(this.newMovieCredits)
        this.genre = _.pluck(this.newMovieInfo.genres, 'name').join(", ");
        this.language = _.pluck(this.newMovieInfo.spoken_languages, 'name').join(", ");
      });
      if(this.newMovieInfo){
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
