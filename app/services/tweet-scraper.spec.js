require('reflect-metadata');
const { Container } = require('inversify');
const nock = require('nock');
const axios = require('axios');
const TYPES = require('../types');
const TweetScraperService = require('./tweet-scraper');
const nockFixturesDirectory = require('../../nock-fixtures');
const config = require('../../config');

const { stringContaining } = expect;

const testDescription = describe('TweetScraperService', () => {
  let tweetScraperService;
  let htmlToScrape;
  let nockDone;

  beforeAll(async () => {
    const container = new Container();
    container.bind(TYPES.TweetScraperService).toConstantValue(TweetScraperService);
    tweetScraperService = container.get(TYPES.TweetScraperService);

    nock.back.fixtures = nockFixturesDirectory;
    nock.back.setMode('record');

    nockDone = await nock.back(`${testDescription.getFullName()}.json`)
      .then(response => response.nockDone);

    htmlToScrape = await axios
      .get(config.twitter.searchUrl, { responseType: 'text' })
      .then(response => response.data);
  });

  afterAll(() => {
    nockDone();
  });

  test('should return an array of all tweets data objects by default', () => {
    const actualTweetsData = tweetScraperService.scrapeTweets(htmlToScrape);

    expect(actualTweetsData).toBeDefined();
    expect(actualTweetsData).toHaveLength(20);
  });

  test('should return tweet date', () => {
    const actualTweetsData = tweetScraperService.scrapeTweets(htmlToScrape);

    expect(actualTweetsData[0].date).toBeInstanceOf(Date);
  });

  test('should return tweet content', () => {
    const actualTweetsData = tweetScraperService.scrapeTweets(htmlToScrape);

    expect(actualTweetsData[0].content.toLowerCase()).toEqual(stringContaining('global warming'));
  });

  test('should return tweet likes', () => {
    const actualTweetsData = tweetScraperService.scrapeTweets(htmlToScrape);

    expect(typeof actualTweetsData[0].likes).toEqual('number');
  });

  test('should return tweet retweets', () => {
    const actualTweetsData = tweetScraperService.scrapeTweets(htmlToScrape);

    expect(typeof actualTweetsData[0].retweets).toEqual('number');
  });
});
