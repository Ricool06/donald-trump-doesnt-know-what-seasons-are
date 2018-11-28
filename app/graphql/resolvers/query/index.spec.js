require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../../../types');
const QueryResolvers = require('.');

describe('QueryResolvers', () => {
  let container;
  let mockHelpResolver;
  let mockTweetsResolver;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.QueryResolvers).to(QueryResolvers);

    mockHelpResolver = jest.mock('./help');
    mockTweetsResolver = jest.mock('./tweets');
    mockHelpResolver.resolve = jest.fn();
    mockTweetsResolver.resolve = jest.fn();

    container.bind(TYPES.HelpResolver).toConstantValue(mockHelpResolver);
    container.bind(TYPES.TweetsResolver).toConstantValue(mockTweetsResolver);
  });

  test('should contain "help" Query resolver', () => {
    const queryResolvers = container.get(TYPES.QueryResolvers);
    queryResolvers.help();

    // I hate duck typing but I cba to change to TypeScript right now
    expect(mockHelpResolver.resolve).toHaveBeenCalledTimes(1);
  });

  test('should contain "tweets" Query resolver', () => {
    const queryResolvers = container.get(TYPES.QueryResolvers);
    queryResolvers.tweets();

    // I hate duck typing but I cba to change to TypeScript right now
    expect(mockTweetsResolver.resolve).toHaveBeenCalledTimes(1);
  });
});
