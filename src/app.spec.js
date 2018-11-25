const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const createApp = require('./app');
const resolvers = require('./resolvers/resolvers');
const typeDefinitions = require('./schema/typeDefinitions');

jest.dontMock('./app');
jest.mock('express', () => jest.fn(() => 'A fake express server object.'));
jest.mock('apollo-server-express');

describe('Application setup', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('should create an express app', () => {
    expect(app).toBeDefined();
    expect(express).toHaveBeenCalled();
  });

  test('should initialise the GraphQL middleware with a playground', () => {
    expect(app).toBeDefined();
    expect(ApolloServer).toHaveBeenCalledWith({
      typeDefinitions,
      resolvers,
      playground: {
        endpoint: '/graphql',
      },
    });
    expect(ApolloServer.mock.instances[0].applyMiddleware).toHaveBeenCalledWith({ app });
  });
});
