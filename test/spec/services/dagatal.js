'use strict';

describe('Factory: Dagatal', function () {

  // load the controller's module
  beforeEach(module('segoApp'));

  var dagatalFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    
    inject(function($injector) {
        dagatalFactory = $injector.get("dagatalFactory");
    });
  }));

  it('should exist a function that returns something', function () {
    expect(dagatalFactory.dagsetning()).toBeDefined();
  });

  it('should exist a function that returns something', function () {
      var d = new Date();
      var t = d.getFullYear() + "-" + d.getMonth() + "-" + d.getMonth() + "T00:00:00";
      expect(dagatalFactory.dags(t)).toEqual("");
  });
});