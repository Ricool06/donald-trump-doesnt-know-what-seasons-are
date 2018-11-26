require('reflect-metadata');
const { ApolloServer } = require('apollo-server-express');
const { Container } = require('inversify');
const TYPES = require('./types');
const Application = require('.');

const mockExpressApp = {
  listen: jest.fn(),
  use: jest.fn(),
};
jest.mock('express', () => jest.fn(
  () => mockExpressApp,
));

jest.mock('apollo-server-express');

describe('Application', () => {
  let container;
  let mockResolvers;
  let mockTypeDefinitions;
  let application;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.Application).to(Application);

    mockResolvers = jest.mock('./graphql/resolvers');
    container.bind(TYPES.Resolvers).toConstantValue(mockResolvers);

    mockTypeDefinitions = jest.mock('./graphql/type-definitions');
    container.bind(TYPES.GraphqlTypeDefinitions).toConstantValue(mockTypeDefinitions);

    application = container.get(TYPES.Application);
  });

  test('should contain all Resolvers', () => {
    expect(application.resolvers).toBe(mockResolvers);
  });

  test('should contain all GraphqlTypeDefinitions', () => {
    expect(application.typeDefinitions).toBe(mockTypeDefinitions);
  });

  test('should have start method that boots application', () => {
    expect(application.start).toBeDefined();

    const testPort = 1337;
    const testEndpoint = '/graphql';
    const actualExpressApp = application.start(testPort, testEndpoint);

    expect(ApolloServer).toHaveBeenCalledWith({
      typeDefs: mockTypeDefinitions,
      resolvers: mockResolvers,
      playground: {
        endpoint: testEndpoint,
      },
    });

    expect(ApolloServer.mock.instances[0].applyMiddleware)
      .toHaveBeenCalledWith({ app: mockExpressApp });

    expect(mockExpressApp.listen).toHaveBeenCalledWith(testPort);

    expect(actualExpressApp).toBe(mockExpressApp);
  });
});
