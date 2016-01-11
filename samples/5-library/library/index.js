import { combineFixtures } from 'bouchon';

import paris from './paris';
import london from './london';


export default {
  name: 'library',
  endpoint: 'library',
  ...combineFixtures({
    paris,
    london,
  }),
};
