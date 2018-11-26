const { BeforeAll, When, Then } = require('cucumber');
const request = require('supertest');
const app = require('../../server');

BeforeAll(() => {
  this.requester = request(app);
  this.responder = null;
});

When('I send a request to the root endpoint', () => {
  this.responder = this.requester
    .post('/graphql')
    .send({
      query: '{ help }',
    });
});

Then('I should see the following response:', (docString, done) => {
  this.responder
    .expect(200, JSON.parse(docString))
    .end(err => done(err));
});
