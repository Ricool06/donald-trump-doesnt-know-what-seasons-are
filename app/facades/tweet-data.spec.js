require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../types');
const TweetDataFacade = require('./tweet-data');

describe('TweetDataFacade', () => {
  let tweetDataFacade;
  let mockTweetFetcher;
  let mockTweetScraper;

  beforeAll(() => {
    const container = new Container();
    container.bind(TYPES.TweetDataFacade).to(TweetDataFacade);

    mockTweetFetcher = jest.mock('../services/tweet-fetcher');
    mockTweetScraper = jest.mock('../services/tweet-scraper');

    container.bind(TYPES.TweetFetcherService).toConstantValue(mockTweetFetcher);
    container.bind(TYPES.TweetScraperService).toConstantValue(mockTweetScraper);
    tweetDataFacade = container.get(TYPES.TweetDataFacade);
  });

  test('should orchestrate calls to tweet fetcher and scraper services to get tweet data', async () => {
    const expectedFetch = 'some html';
    const expectedScrape = [{ tweet: 'something' }];
    mockTweetFetcher.fetchTweets = jest.fn(() => expectedFetch);
    mockTweetScraper.scrapeTweets = jest.fn(() => expectedScrape);

    const actualResult = await tweetDataFacade.getTweets();

    expect(mockTweetFetcher.fetchTweets).toHaveBeenCalledTimes(1);
    expect(mockTweetScraper.scrapeTweets).toHaveBeenCalledWith(expectedFetch);
    expect(actualResult).toBe(expectedScrape);
  });
});
