const { Given, Then } = require('cucumber');
const { expect } = require('chai');

Given('tweets by Donald Trump exist on Twitter', function () {

});

Then('I should receive a valid tweets response', function (done) {
  this.responder
    .expect(200)
    .end((err, response) => {
      expect(response).to.exist;
      expect(response.body).to.haveOwnProperty('data');
      expect(response.body.data).to.haveOwnProperty('tweets');
      expect(response.body.data.tweets).to.have.lengthOf.at.least(1);
      expect(response.body.data.tweets[0]).to.have.all.keys('date', 'content', 'likes', 'retweets');
      done(err);
    });
});
