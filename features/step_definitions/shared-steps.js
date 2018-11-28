const {
  BeforeAll, AfterAll, When, Then,
} = require('cucumber');
const nock = require('nock');
const nockFixturesDirectory = require('../../nock-fixtures');

BeforeAll(async () => {
  this.responder = null;

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

When('I request the following data from {string}:', function (endpoint, query) {
  this.responder = this.requester
    .post(endpoint)
    .send({
      query,
    });
});

Then('I should see the following response:', function (docString, done) {
  this.responder
    .expect(200, JSON.parse(docString))
    .end(err => done(err));
});
