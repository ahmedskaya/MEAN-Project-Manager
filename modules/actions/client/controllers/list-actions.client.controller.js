(function () {
  'use strict';

  angular
    .module('actions')
    .controller('ActionsListController', ActionsListController);

  ActionsListController.$inject = ['ActionsService'];

  function ActionsListController(ActionsService) {
    var vm = this;

    vm.actions = ActionsService.query();
  }
}());
