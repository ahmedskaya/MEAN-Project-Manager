(function () {
  'use strict';

  angular
    .module('projects')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    
  }
}());
