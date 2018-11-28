const config = {
  app: {
    port: process.env.PORT || 7246,
    graphQLEndpoint: process.env.GRAPHQL_ENDPOINT || '/graphql',
  },
  twitter: {
    searchUrl: 'https://twitter.com/search'
    + '?f=tweets'
    + '&vertical=default'
    + '&q="global%20warming"%20from%3ArealDonaldTrump',
  },
};

module.exports = config;
