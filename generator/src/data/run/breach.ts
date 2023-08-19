import rule from '../../official';
import {Area, Section} from '../../types';
import {balanceAreas, plain, textc, verbatim} from '../../utils';

const area75: Area = {
  side: 'runner',
  rules: [
    {
      id: '#7.5.1',
      entry: [
        {
          type: 'detail',
          summary: plain('Breach begins'),
          expanded: [verbatim('#7.5.1')],
        },
      ],
    },
    {
      id: '#7.5.2',
      entry: [
        {
          type: 'interact',
          message: plain('Which server is breached?'),
          composition: 'vertical',
          links: [
            {
              id: '#7.5.2',
              answer: 'Archive',
              action: 'Turn all cards in the Corp’s discard pile faceup.',
            },
            {
              id: '#7.5.3',
              answer: 'HQ or R&D',
              action: 'Determine card candidate limit.',
            },
          ],
        },
      ],
    },
    {
      entry: [
        {
          type: 'detail',
          summary: plain('Card candidates, global'),
          expanded: [
            textc({
              id: '#7.4.1.a',
              text: 'At the beginning of a breach, each card in the root of the breached server is a candidate'
            }),
            verbatim('#7.3.5.b'),
            verbatim('#7.4.6'),
          ]
        },
        {
          type: 'detail',
          summary: plain('Card candidates, HQ'),
          expanded: [
            textc({
              id: '#7.4.1.a',
              text: 'At the beginning of a breach, each card in the Corp’s hand is a candidate'
            }),
            verbatim('#7.3.4.a'),
          ]
        },
        {
          type: 'detail',
          summary: plain('Card candidates, R&D'),
          expanded: [
            textc({
              id: '#7.4.1.a',
              text: 'At the beginning of a breach, the top card of the Corp’s deck is a candidate.'
            }),
            verbatim('#7.4.7'),
          ]
        },
        {
          type: 'detail',
          summary: plain('Card candidates, archives'),
          expanded: [
            textc({
              id: '#7.4.1.a',
              text: 'At the beginning of a breach, each card in the Corp’s discard pile is a candidate.'
            }),
            verbatim('#7.3.2.a'),
          ]
        },
      ]
    },
    {
      id: '#7.5.4',
      entry: [
        {
          type: 'interact',
          message: plain('Can the runner choose a candidate?'),
          composition: 'vertical',
          links: [
            {id: '#7.5.4', answer: 'No', target: '#7.5.7'},
            {id: '#7.5.5', answer: 'Yes', action: 'Access the chosen card.'},
          ],
        },
      ],
    },
    {
      id: '#7.5.6',
      entry: [
        {
          type: 'interact',
          links: [{target: '#7.5.4', action: 'Return to'}],
        },
      ],
    },
    {
      id: '#7.5.7',
      entry: [
        {
          type: 'detail',
          summary: plain('Breach ends'),
          expanded: [verbatim('#7.5.7')],
        },
      ],
    },
  ],
};

export const breach: Section = {
  id: '#7.5',
  name: rule('#7.5'),
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area75]),
      ],
    },
  ],
};
