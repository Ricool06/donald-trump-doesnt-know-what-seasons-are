const axios = require('axios');
const config = require('../../config');

const fetchTweets = async () => axios
  .get(config.twitter.searchUrl, { responseType: 'text' })
  .then(response => response.data);

const tweetFetcherService = {
  fetchTweets,
};

module.exports = tweetFetcherService;
