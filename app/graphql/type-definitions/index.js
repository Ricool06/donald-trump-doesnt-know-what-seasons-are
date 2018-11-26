const { gql } = require('apollo-server-express');

const typeDefinitions = gql`
  type Query {
    help: String
  }
`;

module.exports = typeDefinitions;
