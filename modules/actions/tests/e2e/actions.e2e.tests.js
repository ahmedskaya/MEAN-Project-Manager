'use strict';

describe('Actions E2E Tests:', function () {
  describe('Test Actions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/actions');
      expect(element.all(by.repeater('action in actions')).count()).toEqual(0);
    });
  });
});
