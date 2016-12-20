/**
 * Created by gudjo on 10.12.2016.
 */
'use strict';
describe('sego app', function() {


  beforeEach(function () {
      browser.ignoreSynchronization = true;
      browser.get('http://sego.is/');

      browser.waitForAngular();

  })

  browser.manage().timeouts().implicitlyWait(5000);
  it("should have an expected title", function () {
    expect(browser.getTitle()).toEqual('Sego bókunarlausn');
  });
});
