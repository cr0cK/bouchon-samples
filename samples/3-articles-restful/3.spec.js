/* eslint no-console: 0 */

import path from 'path';
import chai from 'chai';
import freeport from 'freeport';
import { api as bouchon } from 'bouchon';
import request from 'request';


const expect = chai.expect;

describe('3 - List articles (restful)', function test() {
  this.timeout(10000);
  this.port = undefined;
  this.dateCreated = String(new Date());

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
      body: {} },
    { method: 'POST',
      originalUrl: '/articles',
      statusCode: 200,
      query: {},
      params: {},
      body:
       { title: 'Title1',
         body: 'Body1',
         date_created: this.dateCreated,
         user_id: '2' } },
    { method: 'PATCH',
      originalUrl: '/articles/2',
      statusCode: 200,
      query: {},
      params: { id: '2' },
      body: { title: 'Title1 patched', body: 'Body1 patched' } },
    { method: 'PUT',
      originalUrl: '/articles/3',
      statusCode: 200,
      query: {},
      params: { id: '3' },
      body: { title: 'Title2', body: 'Body2', user_id: '3' } },
    { method: 'PUT',
      originalUrl: '/articles/2',
      statusCode: 200,
      query: {},
      params: { id: '2' },
      body: { title: 'Title1 patched again', body: 'Body1 patched again' } },
    { method: 'DELETE',
      originalUrl: '/articles/2',
      statusCode: 200,
      query: {},
      params: { id: '2' },
      body: {} },
    { method: 'GET',
      originalUrl: '/articles',
      statusCode: 200,
      query: {},
      params: {},
      body: {},
    }]);

    bouchon.server.stop().then(() => done());
  });

  it('returns articles on GET request', (done) => {
    request(`http://localhost:${this.port}/articles`, (err, res, body) => {
      if (err) { done(err); }

      expect(res.statusCode).to.equal(200);

      expect(JSON.parse(body)).to.deep.equal([{
        'id': 1,
        'title': 'cillum eu esse',
        'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
        'date_created': 'Tuesday, October 20, 2015 2:34 PM',
        'user_id': 1,
      }]);

      done();
    });
  });

  it('creates an article on POST request', (done) => {
    request.post(
      `http://localhost:${this.port}/articles`,
      { form: {
        title: 'Title1',
        body: 'Body1',
        date_created: this.dateCreated,
        user_id: 2,
      }},
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(201);

        expect(JSON.parse(body)).to.deep.equal([{
          'id': 1,
          'title': 'cillum eu esse',
          'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
          'date_created': 'Tuesday, October 20, 2015 2:34 PM',
          'user_id': 1,
        }, {
          'id': 2,
          'title': 'Title1',
          'body': 'Body1',
          'date_created': this.dateCreated,
          'user_id': 2,
        }]);

        done();
      }
    );
  });

  it('updates an article on PATCH request', (done) => {
    request.patch(
      `http://localhost:${this.port}/articles/2`,
      { form: {
        title: 'Title1 patched',
        body: 'Body1 patched',
      }},
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(201);

        expect(JSON.parse(body)).to.deep.equal([{
          'id': 1,
          'title': 'cillum eu esse',
          'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
          'date_created': 'Tuesday, October 20, 2015 2:34 PM',
          'user_id': 1,
        }, {
          'id': 2,
          'title': 'Title1 patched',
          'body': 'Body1 patched',
          'date_created': this.dateCreated,
          'user_id': 2,
        }]);

        done();
      }
    );
  });

  it('creates an article on PUT request', (done) => {
    request.put(
      `http://localhost:${this.port}/articles/3`,
      { form: {
        title: 'Title2',
        body: 'Body2',
        user_id: 3,
      }},
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(201);

        expect(JSON.parse(body)).to.deep.equal([{
          'id': 1,
          'title': 'cillum eu esse',
          'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
          'date_created': 'Tuesday, October 20, 2015 2:34 PM',
          'user_id': 1,
        }, {
          'id': 2,
          'title': 'Title1 patched',
          'body': 'Body1 patched',
          'date_created': this.dateCreated,
          'user_id': 2,
        }, {
          'id': 3,
          'title': 'Title2',
          'body': 'Body2',
          'user_id': 3,
        }]);

        done();
      }
    );
  });

  it('updates an article on PUT request', (done) => {
    request.put(
      `http://localhost:${this.port}/articles/2`,
      { form: {
        title: 'Title1 patched again',
        body: 'Body1 patched again',
      }},
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(201);

        expect(JSON.parse(body)).to.deep.equal([{
          'id': 1,
          'title': 'cillum eu esse',
          'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
          'date_created': 'Tuesday, October 20, 2015 2:34 PM',
          'user_id': 1,
        }, {
          'id': 2,
          'title': 'Title1 patched again',
          'body': 'Body1 patched again',
          'date_created': null,
          'user_id': null,
        }, {
          'id': 3,
          'title': 'Title2',
          'body': 'Body2',
          'user_id': 3,
        }]);

        done();
      }
    );
  });

  it('deletes an article on DELETE request and returns undefined', (done) => {
    request.del(`http://localhost:${this.port}/articles/2`,
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(204);
        expect(body).to.equal('');

        done();
      }
    );
  });

  it('should delete the item', (done) => {
    request.get(`http://localhost:${this.port}/articles`,
      (err, res, body) => {
        if (err) { done(err); }

        expect(res.statusCode).to.equal(200);

        expect(JSON.parse(body)).to.deep.equal([{
          'id': 1,
          'title': 'cillum eu esse',
          'body': 'Culpa in duis mollit ullamco minim quis ullamco eu.',
          'date_created': 'Tuesday, October 20, 2015 2:34 PM',
          'user_id': 1,
        }, {
          'id': 3,
          'title': 'Title2',
          'body': 'Body2',
          'user_id': 3,
        }]);

        done();
      }
    );
  });
});
