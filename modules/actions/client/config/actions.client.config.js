(function () {
  'use strict';

  angular
    .module('actions')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Actions',
    //   state: 'actions',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // Add the dropdown list item
    menuService.addMenuItem('topbar', {
      title: 'History',
      state: 'actions.list',
      roles: ['user']
    });

    // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'actions', {
    //   title: 'Create Action',
    //   state: 'actions.create',
    //   roles: ['user']
    // });
  }
}());
