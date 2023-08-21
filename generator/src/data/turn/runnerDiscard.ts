import {Section, Area} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const area572_a: Area = {
  side: 'runner',
  rules: [
    {
      id: '#5.7.2.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Discard for hand size'),
          expanded: [verbatim(rule('5.7.2.a'))],
        },
      ],
    },
    {
      id: '#5.7.2.b',
      entry: [
        {
          type: 'detail',
          summary: plain("Runner's paid ability window (P) (R)"),
          expanded: [verbatim(rule('5.7.2.b'))],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#5.7.2.c'}],
          }),
        },
      ],
    },
  ],
};

const area572_b: Area = {
  side: 'corp',
  rules: [
    {
      entry: [
        plain("Corp's paid ability window (P) (R)"),
        plain(boiler.PR_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpBackToRunner,
            links: [{find: '#link', replace: true, link: '#5.7.2.b'}],
          }),
        },
      ],
    },
  ],
};

const area572_c: Area = {
  side: 'runner',
  rules: [
    {
      id: '#5.7.2.c',
      entry: [verbatim(rule('5.7.2.c'))],
    },
    {
      id: '#5.7.2.d',
      entry: [
        {
          type: 'detail',
          summary: plain("End of runner's turn"),
          expanded: [verbatim(rule('5.7.2.d'))],
        },
      ],
    },
    {
      id: '#5.7.2.e',
      entry: [
        verbatim('The Runner’s discard phase and turn are complete.'),
        {
          type: 'interact',
          links: [
            {
              target: '#5.6',
              action: 'Play proceeds to the Corp’s turn.',
            },
          ],
        },
      ],
    },
  ],
};

export const runnerDiscard: Section = {
  id: '#5.7.2',
  name: 'Discard Phase',
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area572_a]),
        balanceAreas([area572_b]),
        balanceAreas([area572_c]),
      ],
    },
  ],
};
