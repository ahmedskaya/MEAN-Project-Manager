(function () {
  'use strict';

  angular
    .module('actions')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('actions', {
        abstract: true,
        url: '/history',
        template: '<ui-view/>'
      })
      .state('actions.list', {
        url: '',
        templateUrl: 'modules/actions/client/views/list-actions.client.view.html',
        controller: 'ActionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Actions List'
        }
      })
      .state('actions.create', {
        url: '/create',
        templateUrl: 'modules/actions/client/views/form-action.client.view.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionResolve: newAction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Actions Create'
        }
      })
      .state('actions.edit', {
        url: '/:actionId/edit',
        templateUrl: 'modules/actions/client/views/form-action.client.view.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionResolve: getAction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Action {{ actionResolve.name }}'
        }
      })
      .state('actions.view', {
        url: '/:actionId',
        templateUrl: 'modules/actions/client/views/view-action.client.view.html',
        controller: 'ActionsController',
        controllerAs: 'vm',
        resolve: {
          actionResolve: getAction
        },
        data: {
          pageTitle: 'Action {{ actionResolve.name }}'
        }
      });
  }

  getAction.$inject = ['$stateParams', 'ActionsService'];

  function getAction($stateParams, ActionsService) {
    return ActionsService.get({
      actionId: $stateParams.actionId
    }).$promise;
  }

  newAction.$inject = ['ActionsService'];

  function newAction(ActionsService) {
    return new ActionsService();
  }
}());
