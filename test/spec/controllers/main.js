'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('segoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a boolean of if windowOpen to the scope, should be false', function () {
    expect(scope.gluggiOpinn).toBe(false);
  });
  
  it('should change boolean value of windowOpen to true', function () {
    expect(scope.gluggiOpinn).toBe(false);
  });
});
