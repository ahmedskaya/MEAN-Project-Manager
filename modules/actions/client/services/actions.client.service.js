// Actions service used to communicate Actions REST endpoints
(function () {
  'use strict';

  angular
    .module('actions')
    .factory('ActionsService', ActionsService);

  ActionsService.$inject = ['$resource'];

  function ActionsService($resource) {
    return $resource('api/actions/:actionId', {
      actionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
