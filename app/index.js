const { decorate, injectable, inject } = require('inversify');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const TYPES = require('./types');

class Application {
  constructor(resolvers, typeDefinitions) {
    this.resolvers = resolvers;
    this.typeDefinitions = typeDefinitions;
  }

  start(portNumber, endpoint) {
    const app = express();

    const apolloServer = new ApolloServer({
      typeDefs: this.typeDefinitions,
      resolvers: this.resolvers,
      playground: {
        endpoint,
      },
    });
    apolloServer.applyMiddleware({ app });

    app.listen(portNumber);
    return app;
  }
}

decorate(injectable(), Application);
decorate(inject(TYPES.Resolvers), Application, 0);
decorate(inject(TYPES.GraphqlTypeDefinitions), Application, 1);

module.exports = Application;
