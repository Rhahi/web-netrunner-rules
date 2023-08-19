import rule from '../../official';
import {Area, Section} from '../../types';
import {balanceAreas, plain, verbatim} from '../../utils';

const area72: Area = {
  side: 'runner',
  rules: [
    {
      id: '#7.2.1',
      entry: [
        {
          type: 'detail',
          summary: plain('The card is accessed.'),
          expanded: [verbatim('#7.2.1'), verbatim('#7.1.7')],
        },
      ],
    },
    {
      id: '#7.2.2',
      entry: [
        {
          type: 'detail',
          summary: plain('Trash or use mid-access ability.'),
          expanded: [
            verbatim('#7.2.2'),
            verbatim({
              text: 'The Runner always has the ability “Access → Pay the trash cost of the accessed card: Trash it.” This is the basic trash ability.',
              id: '#7.1.5',
            }),
          ],
        },
      ],
    },
    {
      id: '#7.2.3',
      entry: [
        {
          type: 'detail',
          summary: verbatim('#7.2.3'),
          expanded: [
            verbatim('#7.1.6'),
            verbatim({
              text: 'Some abilities can create additional costs to steal an agenda. The Runner can decline to pay such costs and not steal the agenda. See section 1.16.10.',
              id: '#7.1.6.a',
            }),
          ],
        },
      ],
    },
    {
      id: '#7.2.4',
      entry: [
        {
          type: 'detail',
          summary: plain('Access ends'),
          expanded: [verbatim('#7.2.4')],
        },
      ],
    },
  ],
};

export const access: Section = {
  id: '#7.2',
  name: rule('#7.2'),
  groups: [
    {
      type: 'permanent',
      divisions: [balanceAreas([area72])],
    },
  ],
};
