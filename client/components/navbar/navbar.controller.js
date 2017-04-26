'use strict';

class NavbarController {
  //start-non-standard
  menu = [
  {
    'title': 'MOVIES',
    'link': '/admin-view'
  },
  {
    'title': 'THEATERS',
    'link': '/theater'
  }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('movieAppApp')
  .controller('NavbarController', NavbarController);
