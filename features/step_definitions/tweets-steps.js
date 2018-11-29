const { Given, Then } = require('cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

Given('tweets by Donald Trump exist on Twitter', function () { });

Given('tweets by Donald Trump exist on Twitter from 2013', function () { });

Then('I should receive a valid tweets response', function (done) {
  const { err, res } = this.responseAndError;
  expect(err).to.be.null;
  expect(res).to.have.status(200);
  expect(res).to.be.json;
  expect(res.body).to.haveOwnProperty('data');
  expect(res.body.data).to.haveOwnProperty('tweets');
  expect(res.body.data.tweets).to.have.lengthOf.at.least(1);
  expect(res.body.data.tweets[0]).to.have.all.keys('date', 'content', 'likes', 'retweets');
  done(err);
});
