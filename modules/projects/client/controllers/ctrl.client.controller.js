(function() {
  'use strict';

  angular
    .module('projects')
    .controller('CtrlController', CtrlController);

  CtrlController.$inject = ['$scope'];

  function CtrlController($scope) {
    var vm = this;

    // Ctrl controller logic
    // ...

    init();

    function init() {
    }
  }
})();
