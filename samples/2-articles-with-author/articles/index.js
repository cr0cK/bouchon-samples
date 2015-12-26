import { createAction } from 'bouchon';
import { selectors as selectorsTb } from 'bouchon-toolbox';

import { selectors as authorsSelectors } from '../authors';

const { selectRow, extendRows } = selectorsTb;


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

// return all articles
selectors.all = () => state => state.articles;

// use the extendRows function of the toolbox to add the author data to each article
selectors.allWithAuthor = () => extendRows(
  selectors.all, 'author_id',
  authorsSelectors.all, 'id',
  'author'
);

// use the selectRow function of the toolbox to filter results
selectors.byId = ({id}) => selectRow(selectors.allWithAuthor, 'id', id);

/**
 * Specs
 */

export default {
  name: 'articles',
  data: require('./data.json'),
  reducer: ({
    [actions.get]: state => state,
  }),
  routes: {
    'GET /': {
      action: actions.get,
      selector: selectors.allWithAuthor,
      status: 200,
    },
    'GET /:id': {
      action: actions.get,
      selector: selectors.byId,
      status: 200,
    },
  },
  endpoint: 'articles',
};
