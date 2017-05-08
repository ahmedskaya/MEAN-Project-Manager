(function () {
  'use strict';

  describe('Actions Route Tests', function () {
    // Initialize global variables
    var $scope,
      ActionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ActionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ActionsService = _ActionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('actions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/actions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ActionsController,
          mockAction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('actions.view');
          $templateCache.put('modules/actions/client/views/view-action.client.view.html', '');

          // create mock Action
          mockAction = new ActionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Action Name'
          });

          // Initialize Controller
          ActionsController = $controller('ActionsController as vm', {
            $scope: $scope,
            actionResolve: mockAction
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:actionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.actionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            actionId: 1
          })).toEqual('/actions/1');
        }));

        it('should attach an Action to the controller scope', function () {
          expect($scope.vm.action._id).toBe(mockAction._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/actions/client/views/view-action.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ActionsController,
          mockAction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('actions.create');
          $templateCache.put('modules/actions/client/views/form-action.client.view.html', '');

          // create mock Action
          mockAction = new ActionsService();

          // Initialize Controller
          ActionsController = $controller('ActionsController as vm', {
            $scope: $scope,
            actionResolve: mockAction
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.actionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/actions/create');
        }));

        it('should attach an Action to the controller scope', function () {
          expect($scope.vm.action._id).toBe(mockAction._id);
          expect($scope.vm.action._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/actions/client/views/form-action.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ActionsController,
          mockAction;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('actions.edit');
          $templateCache.put('modules/actions/client/views/form-action.client.view.html', '');

          // create mock Action
          mockAction = new ActionsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Action Name'
          });

          // Initialize Controller
          ActionsController = $controller('ActionsController as vm', {
            $scope: $scope,
            actionResolve: mockAction
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:actionId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.actionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            actionId: 1
          })).toEqual('/actions/1/edit');
        }));

        it('should attach an Action to the controller scope', function () {
          expect($scope.vm.action._id).toBe(mockAction._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/actions/client/views/form-action.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
