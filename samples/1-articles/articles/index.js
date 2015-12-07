import { createAction } from 'bouchon';

/**
 * Actions
 */

const actions = {
  get: createAction(),
};

/**
 * Selectors
 */

const selectors = {};

// The selector is a function that takes parameters (from querystring, url captures and body) and return an another function that takes the entire state and returns the wanted data.
// Here, we define a function `all` that returns all the articles.
selectors.all = (/* params */) => state => state.articles;

/**
 * Specs
 */

export default {
  // the name is used as a state key. Here, all data will be saved under `state.artcles`
  name: 'articles',
  data: require('./data.json'),
  // Define an object where keys are actions references and values are the reducer implementation.
  // Here, we implement one reducer that returns all the state for the `actions.get` reference.
  reducer: ({
    [actions.get]: state => state,
  }),
  // define all the routes for that fixture.
  // Here, we define a route that will emit an `actions.get` action and where data will be selected by `selectors.all`.
  // The default statusCode will be 200.
  routes: {
    'GET /': {
      action: actions.get,
      selector: selectors.all,
      status: 200,
    },
  },
  // Optionally, you can define an endpoint for the routes of that fixture
  endpoint: 'articles',
};
