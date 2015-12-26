/* eslint func-names: 0 */

const bouchon = require('bouchon');

const createAction = bouchon.createAction;
const createSelector = bouchon.createSelector;


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

selectors.all = function() {
  return function(state) {
    return state.articles;
  };
};

selectors.byId = function(params) {
  return createSelector(
    selectors.all(),
    function(articles) {
      return articles.filter(function(article) {
        return Number(article.id) === Number(params.id);
      }).pop();
    }
  );
};


/**
 * Specs
 */

const specs = {
  name: 'articles',
  data: require('./data.json'),
  reducer: function(on) {
    on(actions.get, function(state) { return state; });
  },
  endpoint: 'articles',
  routes: {
    'GET /': {
      action: actions.get,
      selector: selectors.all,
      status: 200,
    },
    'GET /:id': {
      action: actions.get,
      selector: selectors.byId,
      status: 200,
    },
  },
};

module.exports.default = specs;
