require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('./app/types');
const Application = require('./app');
const graphqlTypeDefinitions = require('./app/graphql/type-definitions');
const Resolvers = require('./app/graphql/resolvers');
const QueryResolvers = require('./app/graphql/resolvers/query');
const HelpResolver = require('./app/graphql/resolvers/query/help');

function main() {
  const container = new Container();
  container.bind(TYPES.Application).to(Application);
  container.bind(TYPES.GraphqlTypeDefinitions).toConstantValue(graphqlTypeDefinitions);
  container.bind(TYPES.Resolvers).to(Resolvers);
  container.bind(TYPES.QueryResolvers).to(QueryResolvers);
  container.bind(TYPES.HelpResolver).toConstantValue(HelpResolver);

  const application = container.get(TYPES.Application);
  module.exports = application.start(7246, '/graphql');
}

main();
