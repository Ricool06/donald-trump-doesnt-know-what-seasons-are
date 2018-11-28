const { decorate, injectable, inject } = require('inversify');
const TYPES = require('../../../types');


class QueryResolvers {
  constructor(helpResolver, tweetsResolver) {
    this.help = () => helpResolver.resolve();
    this.tweets = () => tweetsResolver.resolve();
  }
}

decorate(injectable(), QueryResolvers);
decorate(inject(TYPES.HelpResolver), QueryResolvers, 0);
decorate(inject(TYPES.TweetsResolver), QueryResolvers, 1);

module.exports = QueryResolvers;
