require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../../../types');
const helpResolver = require('./help');

describe('HelpResolver', () => {
  let container;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.HelpResolver).toConstantValue(helpResolver);
  });

  test('should have resolve method that returns help text', () => {
    const testHelpResolver = container.get(TYPES.HelpResolver);

    expect(testHelpResolver.resolve()).toBe('Use this API somehow');
  });
});
