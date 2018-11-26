require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../../types');
const Resolvers = require('.');

describe('resolvers', () => {
  let container;

  beforeEach(() => {
    container = new Container();
    container.bind(TYPES.Resolvers).to(Resolvers);
  });

  test('should contain Query resolvers', () => {
    const mockQueryResolvers = jest.mock('./query');
    container.bind(TYPES.QueryResolvers).toConstantValue(mockQueryResolvers);

    const resolvers = container.get(TYPES.Resolvers);

    // I hate duck typing but I cba to change to TypeScript right now
    expect(resolvers.Query).toBe(mockQueryResolvers);
  });
});
