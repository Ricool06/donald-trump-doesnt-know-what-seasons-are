const resolvers = require('./resolvers');

describe('"help" resolver', () => {
  test('should return the help text', () => {
    expect(resolvers.Query.help()).toBe('Use this API somehow');
  });
});
