import {Page} from '../types';
import * as run from './run/steps';
import {breach} from './run/breach';
import {access} from './run/access';

export const data: Page = {
  title: 'Steps of a Run',
  id: '#6',
  topics: [
    {
      sections: [
        run.initiation,
        run.approach,
        run.encounter,
        run.movement,
        run.success,
        breach,
        access,
        run.end,
      ],
    },
  ],
};
