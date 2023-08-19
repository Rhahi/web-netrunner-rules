import {Section, Area} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const area563_a: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.3.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Discard for hand size'),
          expanded: [verbatim(rule('5.6.3.a'))],
        },
      ],
    },
    {
      id: '#5.6.3.b',
      entry: [
        {
          type: 'detail',
          summary: plain("Corp's paid ability window (P) (R)"),
          expanded: [verbatim(rule('5.6.3.b'))],
        },
        plain(boiler.PR_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpPAWPass,
            links: [{find: '#link', replace: true, link: '#5.6.3.c'}],
          }),
        },
      ],
    },
  ],
};

const area563_b: Area = {
  side: 'runner',
  rules: [
    {
      entry: [
        plain("Runner's paid ability window (P) (R)"),
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerBackToCorp,
            links: [{find: '#link', replace: true, link: '#5.6.3.b'}],
          }),
        },
      ],
    },
  ],
};

const area563_c: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.3.c',
      entry: [verbatim(rule('5.6.3.c'))],
    },
    {
      id: '#5.6.3.d',
      entry: [
        {
          type: 'detail',
          summary: plain("End of corp's turn"),
          expanded: [verbatim(rule('5.6.3.d'))],
        },
      ],
    },
    {
      id: '#5.6.3.e',
      entry: [
        verbatim('The Corp’s discard phase and turn are complete.'),
        {
          type: 'interact',
          links: [
            {
              target: '#5.7',
              action: 'Play proceeds to the Runner’s turn.',
            },
          ],
        },
      ],
    },
  ],
};

export const corpDiscard: Section = {
  id: '#5.6.3',
  name: 'Discard Phase',
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area563_a]),
        balanceAreas([area563_b]),
        balanceAreas([area563_c]),
      ],
    },
  ],
};
