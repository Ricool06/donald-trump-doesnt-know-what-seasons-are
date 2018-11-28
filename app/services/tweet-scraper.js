const { load } = require('cheerio');

const parseTweet = (element) => {
  const $ = load(element);
  const secondsEpoch = Number($('._timestamp').attr('data-time-ms'));
  const date = new Date(secondsEpoch);

  const content = $('.tweet-text').text();

  const likes = Number($('.ProfileTweet-action--favorite > .ProfileTweet-actionCount').attr('data-tweet-stat-count'));
  const retweets = Number($('.ProfileTweet-action--retweet > .ProfileTweet-actionCount').attr('data-tweet-stat-count'));

  return {
    date,
    content,
    likes,
    retweets,
  };
};

const scrapeTweets = (htmlToScrape) => {
  const $ = load(htmlToScrape);
  return $('#stream-items-id')
    .find('li.stream-item')
    .map((index, element) => parseTweet(element))
    .get();
};

const tweetScraperService = {
  scrapeTweets,
};

module.exports = tweetScraperService;
