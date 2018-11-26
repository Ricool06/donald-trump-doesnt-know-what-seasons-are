const { decorate, injectable, inject } = require('inversify');
const TYPES = require('../../../types');


class QueryResolvers {
  constructor(helpResolver) {
    this.help = helpResolver.resolve;
  }
}

decorate(injectable(), QueryResolvers);
decorate(inject(TYPES.HelpResolver), QueryResolvers, 0);

module.exports = QueryResolvers;
