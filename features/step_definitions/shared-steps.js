const {
  BeforeAll, AfterAll, When, Then,
} = require('cucumber');
const nock = require('nock');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nockFixturesDirectory = require('../../nock-fixtures');

chai.use(chaiHttp);
const { expect } = chai;

BeforeAll(async () => {
  nock.back.fixtures = nockFixturesDirectory;
  nock.back.setMode('record');

  const localRequestFilter = request => !request.scope.match(/127\.0\.0\.1:[0-9]*/);
  const nockBackConfig = {
    after: () => nock.enableNetConnect('127.0.0.1'),
    afterRecord: requests => requests.filter(localRequestFilter),
  };

  this.nockDone = await nock
    .back('e2e.json', nockBackConfig)
    .then(response => response.nockDone);
});

AfterAll(() => {
  this.nockDone();
});

When('I request the following data from {string}:', function (endpoint, query, done) {
  this.requester
    .post(endpoint)
    .send({ query })
    .end((err, res) => {
      this.responseAndError = { err, res };
      done();
    });
});

Then('I should see the following response:', function (docString) {
  const { err, res } = this.responseAndError;
  expect(err).to.be.null;
  expect(res).to.have.status(200, 'status');
  expect(res).to.be.json;
  expect(res.body).to.deep.equal(JSON.parse(docString));
});
