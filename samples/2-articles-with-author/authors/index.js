import { createAction } from 'bouchon';
import { selectors as selectorsTb } from 'bouchon-toolbox';

const { filterRows } = selectorsTb;


/**
 * Actions
 */

const actions = {
  get: createAction(),
};

/**
 * Selectors
 */

export const selectors = {};

selectors.all = () => state => state.authors;

// use the filterRows function of the toolbox to filter results
selectors.byId = ({id}) => filterRows(selectors.all(), 'id', id);

/**
 * Specs
 */

export default {
  name: 'authors',
  data: require('./data.json'),
  reducer: ({
    [actions.get]: state => state,
  }),
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
  endpoint: 'authors',
};
