'use strict';

class NavbarController {
  //start-non-standard

  isCollapsed = true;
  //end-non-standard

  constructor($location, Auth, booking) {
    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;
}

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('movieAppApp')
  .controller('NavbarController', NavbarController);
