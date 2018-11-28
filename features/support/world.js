const { setWorldConstructor } = require('cucumber');
const request = require('supertest');
const app = require('../../server');

function World() {
  this.requester = request(app);
  this.responder = null;
}

setWorldConstructor(World);
