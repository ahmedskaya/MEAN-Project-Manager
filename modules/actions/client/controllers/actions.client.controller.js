(function () {
  'use strict';

  // Actions controller
  angular
    .module('actions')
    .controller('ActionsController', ActionsController);

  ActionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'actionResolve'];

  function ActionsController ($scope, $state, $window, Authentication, action) {
    var vm = this;

    vm.authentication = Authentication;
    vm.action = action;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Action
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.action.$remove($state.go('actions.list'));
      }
    }

    // Save Action
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.actionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.action._id) {
        vm.action.$update(successCallback, errorCallback);
      } else {
        vm.action.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('actions.view', {
          actionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
