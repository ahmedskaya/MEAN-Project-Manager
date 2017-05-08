(function () {
  'use strict';

  angular
    .module('projects')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addMenuItem('topbar', {
      title: 'Projects',
      state: 'projects.list',
      roles: ['user']
    });
  }
}());
