'use strict';

describe('Factory: Dagatal', function () {

  // load the controller's module
  beforeEach(module('segoapp'));

  var dagatalFactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_dagatalFactory_) {
      dagatalFactory = _dagatalFactory_;

  }));

  it('should have getDate() function defined', function() {
    expect(dagatalFactory.getDate()).toBeDefined();
  });

  it('getDate() function should return Date() object for today', function() {
      var getDate = dagatalFactory.getDate();
      var tmpDate = new Date();

      expect(getDate.getDate()).toBe(tmpDate.getDate());
      expect(getDate.getMonth()).toBe(tmpDate.getMonth());
      expect(getDate.getFullYear()).toBe(tmpDate.getFullYear());
  });

  it('When running tomorrow() and getDate() should return date tomorrow', function() {
    dagatalFactory.tomorrow();
    var getTomorrow = dagatalFactory.getDate();
    var tmpTomorrow = new Date();
    tmpTomorrow.setDate(tmpTomorrow.getDate() + 1);
    expect(getTomorrow.getDate()).toBe(tmpTomorrow.getDate());

  });

  it('When running yesterday() and getDate() should return date yesterday', function() {
    dagatalFactory.yesterday();
    var getTomorrow = dagatalFactory.getDate();
    var tmpTomorrow = new Date();
    tmpTomorrow.setDate(tmpTomorrow.getDate() - 1);
    expect(getTomorrow.getDate()).toBe(tmpTomorrow.getDate());

  });

  it('should have dateToStringISL() function defined', function () {
    expect(dagatalFactory.dateToStringISL()).toBeDefined();
  });



  it('getStringForDate(new Date()) should return string YYYY-MM-DDTHH:MM:SS', function () {
      var d = new Date();
      var month = d.getMonth()+1;
      var t = d.getFullYear() + "-" + month + "-" + d.getDate() + "T00:00:00";
      expect(dagatalFactory.getStringForDate(d)).toEqual(t);
  });

    it('getStringForDate(new Date(), time) should return string YYYY-MM-DDTtime', function () {
      var d = new Date();
      var t = "17:00";
      var month = d.getMonth()+1;
      var t = d.getFullYear() + "-" + month + "-" + d.getDate() + "T" + t;
      expect(dagatalFactory.getStringForDate(d)).toEqual(t);
  });

});
