import { createAction, SchemaObject } from 'bouchon';
import { reducers } from 'bouchon-toolbox';

const { restful } = reducers;


const ArticleSchema = new SchemaObject({
  id: Number,
  title: String,
  body: String,
  date_created: String,
  user_id: Number,
});


/**
 * Actions
 */

const actions = {
  get: createAction(),
  post: createAction(),
  put: createAction(),
  patch: createAction(),
  delete: createAction(),
};

/**
 * Selectors
 */

const selectors = {};

selectors.all = () => state => state.articles;


/**
 * Specs
 */

export default {
  name: 'articles',
  data: require('./data.json'),
  reducer: restful(actions, ArticleSchema),
  routes: {
    'GET /': {
      action: actions.get,
      selector: selectors.all,
      status: 200,
    },
    'POST /': {
      action: actions.post,
      selector: selectors.all,
      status: 201,
    },
    'PATCH /:id': {
      action: actions.patch,
      selector: selectors.all,
      status: 201,
    },
    'PUT /:id': {
      action: actions.put,
      selector: selectors.all,
      status: 201,
    },
    'DELETE /:id': {
      action: actions.delete,
      status: 204,
    },
  },
  endpoint: 'articles',
};
