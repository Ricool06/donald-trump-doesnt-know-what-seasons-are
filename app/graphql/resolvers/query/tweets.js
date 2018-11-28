const { decorate, injectable, inject } = require('inversify');
const TYPES = require('../../../types');

class TweetsResolver {
  constructor(tweetDataFacade) {
    this.tweetDataFacade = tweetDataFacade;
  }

  resolve() {
    return this.tweetDataFacade.getTweets();
  }
}

decorate(injectable(), TweetsResolver);
decorate(inject(TYPES.TweetDataFacade), TweetsResolver, 0);

module.exports = TweetsResolver;
