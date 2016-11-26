'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('segoapp'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller) {
      var profile = {};
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });

    spyOn(localStorage, 'getItem').and.callFake(function(key) {
        return profile[key];
    });

  }));

  it('should have bookings defined', function () {
    expect(scope.bookings).toBeDefined();

  });

  it('bookings should be empty', function() {
      expect(scope.bookings.length).toEqual(0);
  });
});
