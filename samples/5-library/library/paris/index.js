import { combineFixtures } from 'bouchon';

import books from './books';
import authors from './authors';


export default {
  name: 'paris',
  endpoint: 'paris',
  ...combineFixtures({
    books,
    authors,
  }),
};
