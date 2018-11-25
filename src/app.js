const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers/resolvers');
const typeDefs = require('./schema/typeDefinitions');

function createApp() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: '/graphql',
    },
  });
  apolloServer.applyMiddleware({ app });

  return app;
}

module.exports = createApp;
