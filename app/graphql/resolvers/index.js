const { decorate, injectable, inject } = require('inversify');
const TYPES = require('../../types');

class Resolvers {
  constructor(queryResolvers) {
    this.Query = queryResolvers;
  }
}

decorate(injectable(), Resolvers);
decorate(inject(TYPES.QueryResolvers), Resolvers, 0);

module.exports = Resolvers;
