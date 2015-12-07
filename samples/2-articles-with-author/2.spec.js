/* eslint no-console: 0 */

import path from 'path';
import chai from 'chai';
import freeport from 'freeport';
import { api as bouchon } from 'bouchon';
import request from 'request';


const expect = chai.expect;

describe('2 - List articles with authors', function test() {
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
    }, {
      method: 'GET',
      originalUrl: '/articles/1',
      statusCode: 200,
      query: {},
      params: {id: '1'},
      body: {},
    }, {
      method: 'GET',
      originalUrl: '/authors',
      statusCode: 200,
      query: {},
      params: {},
      body: {},
    }, {
      method: 'GET',
      originalUrl: '/authors/1',
      statusCode: 200,
      query: {},
      params: {id: '1'},
      body: {},
    }]);

    bouchon.server.stop().then(() => done());
  });

  it('should return articles with authors', (done) => {
    request(`http://localhost:${this.port}/articles`, (err, res, body) => {
      if (err) { done(err); }

      expect(JSON.parse(body).length).to.equal(25);
      done();
    });
  });

  it('should return 1 article with the author', (done) => {
    request(`http://localhost:${this.port}/articles/1`, (err, res, body) => {
      if (err) { done(err); }

      expect(JSON.parse(body)).to.deep.equal({
        id: 1,
        title: 'cillum eu esse',
        body: 'Culpa in duis mollit ullamco minim quis ullamco eu. Veniam duis consequat ad veniam commodo. Labore laboris commodo aliquip ad labore non. Sit commodo nostrud id voluptate voluptate magna exercitation eu occaecat officia pariatur. Enim adipisicing quis fugiat et do esse non mollit. Officia exercitation irure culpa anim excepteur minim dolore duis.',
        date_created: 'Tuesday, October 20, 2015 2:34 PM',
        author_id: 1,
        author: {
          last: 'Hodges',
          first: 'Jamie',
          id: 1,
        },
      });

      done();
    });
  });

  it('should return authors', (done) => {
    request(`http://localhost:${this.port}/authors`, (err, res, body) => {
      if (err) { done(err); }

      expect(JSON.parse(body).length).to.equal(15);
      done();
    });
  });

  it('should return 1 author', (done) => {
    request(`http://localhost:${this.port}/authors/1`, (err, res, body) => {
      if (err) { done(err); }

      expect(JSON.parse(body)).to.deep.equal({
        last: 'Hodges',
        first: 'Jamie',
        id: 1,
      });

      done();
    });
  });
});
