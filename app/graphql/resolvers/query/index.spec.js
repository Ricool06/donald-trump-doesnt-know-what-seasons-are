require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../../../types');
const QueryResolvers = require('.');

describe('QueryResolvers', () => {
  let container;

  beforeEach(() => {
    container = new Container();
    container.bind(TYPES.QueryResolvers).to(QueryResolvers);
  });

  test('should contain "help" Query resolver', () => {
    const mockHelpResolver = jest.mock('./help');
    container.bind(TYPES.HelpResolver).toConstantValue(mockHelpResolver);

    const queryResolvers = container.get(TYPES.QueryResolvers);

    // I hate duck typing but I cba to change to TypeScript right now
    expect(queryResolvers.help).toBe(mockHelpResolver.resolve);
  });
});
