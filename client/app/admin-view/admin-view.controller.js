'use strict';

(function(){

class AdminViewComponent {
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
    this.$http.get('/api/admin-view-endpoints').then(response => {
      this.moviesData = response.data;
      this.socket.syncUpdates('adminViewEndpoint', this.moviesData);
    });
  }

  addMovie() {
    this.$http.post('/api/admin-view-endpoints/', {
      name: this.newMovie.Title,
      genre: this.newMovie.Genre,
      date: this.newMovie.Released
    });
    this.movieInput=false;
  }

  deleteMovie(movie) {
    this.$http.delete('/api/admin-view-endpoints/' + movie._id);
  }

  searchMovie(title) {
    this.$http.get('http://www.omdbapi.com/?t=' + title).then(response => {
      this.newMovie = response.data;
      if(this.newMovie){
        this.movieInput = true;
        document.getElementById("searchButton").value = "";
      }
    });
  }

}

angular.module('movieAppApp')
  .component('adminView', {
    templateUrl: 'app/admin-view/admin-view.html',
    controller: AdminViewComponent,
    controllerAs: 'adminViewCtrl'
  });

})();
