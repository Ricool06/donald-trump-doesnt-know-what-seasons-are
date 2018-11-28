require('reflect-metadata');
const { Container } = require('inversify');
const nock = require('nock');
const { load } = require('cheerio');
const TYPES = require('../types');
const nockFixturesDirectory = require('../../nock-fixtures');
const TweetFetcherService = require('./tweet-fetcher');

const testDescription = describe('TweetFetcherService', () => {
  let tweetFetcherService;
  let nockDone;

  beforeAll(async () => {
    const container = new Container();
    container.bind(TYPES.TweetFetcherService).toConstantValue(TweetFetcherService);
    tweetFetcherService = container.get(TYPES.TweetFetcherService);

    nock.back.fixtures = nockFixturesDirectory;
    nock.back.setMode('record');

    nockDone = await nock.back(`${testDescription.getFullName()}.json`)
      .then(response => response.nockDone);
  });

  afterAll(() => {
    nockDone();
  });

  test('should fetch search page from Twitter', async () => {
    const $ = load(await tweetFetcherService.fetchTweets());
    const tweets = $('#stream-items-id').find('li.stream-item');

    expect(tweets.get()).toHaveLength(20);
    expect(tweets.eq(0).text()).toContain('@realDonaldTrump');
  });
});
