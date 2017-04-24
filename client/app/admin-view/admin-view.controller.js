'use strict';

(function(){

class AdminViewComponent {
  constructor($http, $scope) {
    this.message = 'Hello';
    this.$http = $http;
    this.$scope = $scope;
  }

  // var getMovies = function
  $onInit(){
    this.$http.get('/api/moviesModel')
      .then(response => {
        this.movies = response.data;
        this.socket.syncUpdates('thing', this.movies);
      });
    this.$http.get('/api/moviesModel').then(function(response){
      this.$scope.movies = response.data;
      console.log('get success');
    });
  }
  // getMovies();

//   this.$scope.AddMovie = function(){
//     this.$http.post('/api/moviesDb/', $scope.newMovie).then(function(response){
//       console.log("post success");
//       getMovies();
//     });
//   };
//   this.$scope.DeleteMovie = function(movie){
//     this.$http.delete('/api/moviesDb/' + movie._id).then(function(response){
//       console.log("delete success");
//       getMovies();
//     });
//   }
// }
}
angular.module('movieAppApp')
  .component('adminView', {
    templateUrl: 'app/admin-view/admin-view.html',
    controller: AdminViewComponent,
    controllerAs: 'adminViewCtrl'
  });

})();
