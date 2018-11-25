const { BeforeAll, When, Then } = require('cucumber');
const request = require('supertest');
const app = require('../../src/app')();

BeforeAll(() => {
  this.requester = request(app);
  this.responder = undefined;
});

When('I send a request to the root endpoint', () => {
  this.responder = this.requester
    .post('/graphql')
    .send({
      query: '{ help }',
    });
});

Then('I should see the following response:', (docString) => {
  this.responder
    .expect(200, JSON.parse(docString));
});
