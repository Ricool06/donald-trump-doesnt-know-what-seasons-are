const { Given, Then } = require('cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

Given('tweets by Donald Trump exist on Twitter', function () { });

Given('tweets by Donald Trump exist on Twitter from 2013', function () { });

Then('I should receive a valid tweets response', function () {
  const { err, res } = this.responseAndError;
  expect(err).to.be.null;
  expect(res).to.have.status(200);
  expect(res).to.be.json;
  expect(res.body).to.haveOwnProperty('data');
  expect(res.body.data).to.haveOwnProperty('tweets');
  expect(res.body.data.tweets).to.have.lengthOf.at.least(1);
  expect(res.body.data.tweets[0]).to.have.all.keys('date', 'content', 'likes', 'retweets');
});

Then('the response should contain tweets from 2013', function () {
  const { res } = this.responseAndError;
  const startOf2013 = new Date('2013-01-01T00:00:00.000Z');
  const endOf2013 = new Date('2013-12-31T23:59:59.000Z');
  const dates = res.body.data.tweets.map(dateString => new Date(dateString));

  dates.forEach((date) => {
    expect(date).to.be.above(startOf2013);
    expect(date).to.be.below(endOf2013);
  });
});
