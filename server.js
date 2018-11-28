require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('./app/types');
const Application = require('./app');
const graphqlTypeDefinitions = require('./app/graphql/type-definitions');
const Resolvers = require('./app/graphql/resolvers');
const QueryResolvers = require('./app/graphql/resolvers/query');
const helpResolver = require('./app/graphql/resolvers/query/help');
const TweetsResolver = require('./app/graphql/resolvers/query/tweets');
const TweetDataFacade = require('./app/facades/tweet-data');
const tweetFetcherService = require('./app/services/tweet-fetcher');
const tweetScraperService = require('./app/services/tweet-scraper');
const config = require('./config');

function main() {
  const container = new Container();
  container.bind(TYPES.Application).to(Application);
  container.bind(TYPES.GraphqlTypeDefinitions).toConstantValue(graphqlTypeDefinitions);

  container.bind(TYPES.Resolvers).to(Resolvers);
  container.bind(TYPES.QueryResolvers).to(QueryResolvers);

  container.bind(TYPES.HelpResolver).toConstantValue(helpResolver);

  container.bind(TYPES.TweetsResolver).to(TweetsResolver);
  container.bind(TYPES.TweetDataFacade).to(TweetDataFacade);
  container.bind(TYPES.TweetFetcherService).toConstantValue(tweetFetcherService);
  container.bind(TYPES.TweetScraperService).toConstantValue(tweetScraperService);

  const application = container.get(TYPES.Application);
  module.exports = application.start(
    config.app.port,
    config.app.graphQLEndpoint,
  );
}

main();
