const { gql } = require('apollo-server-express');

const typeDefinitions = gql`
  scalar Date

  type Tweet {
    date: Date!,
    content: String!,
    likes: Int!,
    retweets: Int!,
  }

  type Query {
    help: String!,
    tweets: [Tweet!]!
  }
`;

module.exports = typeDefinitions;
