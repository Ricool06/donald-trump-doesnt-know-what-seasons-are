const TYPES = {
  Application: Symbol.for('Application'),
  Resolvers: Symbol.for('Resolvers'),
  QueryResolvers: Symbol.for('QueryResolvers'),
  HelpResolver: Symbol.for('HelpResolver'),
  TweetsResolver: Symbol.for('TweetsResolver'),
  GraphqlTypeDefinitions: Symbol.for('GraphqlTypeDefinitions'),
  TweetDataFacade: Symbol.for('TweetDataFacade'),
  TweetFetcherService: Symbol.for('TweetFetcherService'),
  TweetScraperService: Symbol.for('TweetScraperService'),
};

module.exports = TYPES;
