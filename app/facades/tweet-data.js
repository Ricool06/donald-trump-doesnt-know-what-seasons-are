const { decorate, injectable, inject } = require('inversify');
const TYPES = require('../types');

class TweetDataFacade {
  constructor(tweetFetcherService, tweetScraperService) {
    this.tweetFetcherService = tweetFetcherService;
    this.tweetScraperService = tweetScraperService;
  }

  async getTweets() {
    const tweets = await this.tweetFetcherService.fetchTweets();
    return this.tweetScraperService.scrapeTweets(tweets);
  }
}

decorate(injectable(), TweetDataFacade);
decorate(inject(TYPES.TweetFetcherService), TweetDataFacade, 0);
decorate(inject(TYPES.TweetScraperService), TweetDataFacade, 1);

module.exports = TweetDataFacade;
