'use strict';


(function() {

  class MainController {

    constructor($http, $location, Auth, booking) {
      this.$http = $http;
      this.$location = $location;
      this.movieNames = [];
      this.movieDetails = [];
      this.adminMovieDetails = [];
      this.rating = 0;
      this.count = 0;
      this.avgR = 0;
      this.movie;
      this.cityName;
      this.booking = booking;
      this.currentUser = Auth.getCurrentUser().role;
      this.userName = Auth.getCurrentUser().name;
      this.canRate = true;
      this.rateObj = [];
      this.cnt = 0;
    }

    $onInit() {
      if(!this.currentUser){
        this.currentUser = 'anon'
      }
      console.log(this.currentUser);
      $("#clickety").click(function() {
        $('html, body').animate({
            scrollTop: $("#search-bar").offset().top
        }, 700);
      });
      if(this.currentUser !== 'admin'){
        $('#myModal').modal();
      };
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
        this.$http.get('/api/movie-endpoints').then(response => {
          for(let ele of this.boundData){
            for(let elem of response.data){
              if(elem.title === ele.movie && !this.adminMovieDetails.includes(elem)){
                this.adminMovieDetails.push(elem);
              }
            }
          }
        });
      });
    }

    getMovieDet(movie){
      $('#movieModal').modal();
      console.log("vds");
      this.selMov = _.findWhere(this.movieDetails, {title:movie});
    }

    rate(movie) {
      if(this.cnt===0){
        this.cnt++;
        this.$rateYo = $("#rateYo").rateYo();
      }
      else{
        var movieData = _.findWhere(this.movieDetails, {title:movie});
        this.canRate = false;
        this.cnt = 0;
        this.rating += this.$rateYo.rateYo("rating");
        this.count++;
        this.avgR = this.rating/this.count;
        this.rateObj.push({
          userName: this.userName,
          hasRated: true
        });
        if(this.rateObj.length){
          this.$http.put('/api/movie-endpoints/' + movieData._id, {
            avgRating: this.avgR,
            rating: this.rateObj
          });
        }
      }
    }

    selCity() {
      $('#myModal').modal('hide');
      console.log(this.boundData);
      for(let ele of this.boundData){
        if(ele.city===this.cityName){
          for(let elem of this.adminMovieDetails){
            if(elem.title === ele.movie && !this.movieDetails.includes(elem)){
              this.movieDetails.push(elem);
            }
          }
        }
      }
    }

    sel(movie, poster) {
      this.booking.selectedMovie = movie;
      this.booking.selectedPoster = poster;
      this.$location.path('/datetime-select');
    }

  }

  angular.module('movieAppApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController,
      controllerAs: 'mainCtrl'
    });
})();
