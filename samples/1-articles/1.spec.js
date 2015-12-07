/* eslint no-console: 0 */

import path from 'path';
import chai from 'chai';
import freeport from 'freeport';
import { api as bouchon } from 'bouchon';
import request from 'request';


const expect = chai.expect;

describe('1 - List articles', function test() {
  this.timeout(10000);
  this.port = undefined;

  before((done) => {
    freeport((err, port) => {
      this.port = port;
      const pathFixtures = path.resolve(__dirname);
      bouchon.server.start({ path: pathFixtures, port })
        .then(() => done())
        .catch(done);
    });
  });

  after((done) => {
    expect(bouchon.logs.get()).to.deep.equal([{
      method: 'GET',
      originalUrl: '/articles',
      statusCode: 200,
      query: {},
      params: {},
      body: {},
    }]);

    bouchon.server.stop().then(() => done());
  });

  it('should return articles', (done) => {
    request(`http://localhost:${this.port}/articles`, (err, res, body) => {
      if (err) { done(err); }

      expect(JSON.parse(body).length).to.equal(25);
      done();
    });
  });
});
