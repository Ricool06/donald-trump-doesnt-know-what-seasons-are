const { setWorldConstructor } = require('cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

function World() {
  chai.use(chaiHttp);
  this.requester = chai.request(app);
  this.responseAndError = null;
}

setWorldConstructor(World);
