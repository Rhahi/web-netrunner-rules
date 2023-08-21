import {Section, Area} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const area561_a: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.1.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Gain clicks'),
          expanded: [verbatim(rule('5.6.1.a'))],
        },
      ],
    },
    {
      id: '#5.6.1.b',
      entry: [
        {
          type: 'detail',
          summary: plain("Corp's paid ability window (P) (R) (S)"),
          expanded: [verbatim(rule('5.6.1.b'))],
        },
        plain(boiler.PRS_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpPAWPass,
            links: [{find: '#link', replace: true, link: '#5.6.1.c'}],
          }),
        },
      ],
    },
  ],
};

const area561_b: Area = {
  side: 'runner',
  rules: [
    {
      entry: [
        plain("Runner's paid ability window (P) (R) (S)"),
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerBackToCorp,
            links: [{find: '#link', replace: true, link: '#5.6.1.b'}],
          }),
        },
      ],
    },
  ],
};

const area561_c: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.1.c',
      entry: [
        {
          type: 'detail',
          summary: plain('Refill recurring credits'),
          expanded: [verbatim(rule('5.6.1.c'))],
        },
      ],
    },
    {
      id: '#5.6.1.d',
      entry: [
        {
          type: 'detail',
          summary: plain('Turn begins'),
          expanded: [
            verbatim(
              'The Corp’s turn formally begins. Conditions related to the turn beginning are met.'
            ),
          ],
        },
      ],
    },
    {
      id: '#5.6.1.e',
      entry: [
        {
          type: 'detail',
          summary: plain('Mandatory draw'),
          expanded: [verbatim('The Corp performs their mandatory draw.')],
        },
      ],
    },
    {
      id: '#5.6.1.f',
      entry: [
        {
          type: 'detail',
          summary: plain('Draw phase ends'),
          expanded: [verbatim(rule('5.6.1.f'))],
        },
        {
          type: 'interact',
          links: [
            {
              target: '#5.6.2',
              action: 'Action Phase',
            },
          ],
        },
      ],
    },
  ],
};

const area561_ex1: Area = {
  side: 'corp',
  rules: [
    {
      entry: [
        textc({
          text: 'Assets with start of turn trigger, such as Marilyn Campaign, can be rezzed during this paid ability window (5.6.1.b) to gain the start of turn income.',
          links: [
            {
              find: 'Marilyn Campaign',
              replace: false,
              link: 'https://netrunnerdb.com/en/card/31042',
            },
            {
              find: '(5.6.1.b)',
              replace: false,
              link: '#5.6.1.b',
            },
          ],
        }),
        textc({
          text: 'These effects will not happen until the turn formally begins at (5.6.1.d). If you have multiple start-of-the-turn-effect cards, you resolve the effects in the order you prefer.',
          links: [
            {
              find: '(5.6.1.d)',
              replace: false,
              link: '#5.6.1.d',
            },
          ],
        }),
      ],
    },
  ],
};
// example: rezzing marilyn

export const corpDraw: Section = {
  id: '#5.6.1',
  name: 'Draw Phase',
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area561_a]),
        balanceAreas([area561_b]),
        balanceAreas([area561_c]),
      ],
    },
    {
      type: 'hidden',
      name: 'When is the last time I can rez Marilyn Campaign to get its effect?',
      divisions: [balanceAreas([area561_ex1])],
    },
  ],
};
