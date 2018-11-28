require('reflect-metadata');
const { Container } = require('inversify');
const TYPES = require('../../../types');
const TweetsResolver = require('./tweets');

describe('TweetsResolver', () => {
  let container;
  let mockTweetFacade;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.TweetsResolver).to(TweetsResolver);

    mockTweetFacade = jest.mock('../../../facades/tweet-data');

    container.bind(TYPES.TweetDataFacade).toConstantValue(mockTweetFacade);
  });

  test('should have resolve method that returns tweets', () => {
    mockTweetFacade.getTweets = jest.fn(() => [{ content: 'a tweet' }]);

    const testTweetsResolver = container.get(TYPES.TweetsResolver);

    expect(testTweetsResolver.resolve()).toEqual(mockTweetFacade.getTweets());
  });
});
