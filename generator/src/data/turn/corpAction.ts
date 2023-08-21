import {Section, Area} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const area562_a: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.2.a',
      entry: [
        {
          type: 'detail',
          summary: plain("Corp's paid ability window (P) (R) (S)"),
          expanded: [verbatim(rule('5.6.2.a'))],
        },
        plain(boiler.PRS_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpPAWPass,
            links: [{find: '#link', replace: true, link: '#5.6.2.c'}],
          }),
        },
      ],
    },
  ],
};

const area562_b: Area = {
  side: 'runner',
  rules: [
    {
      entry: [
        plain("Runner's paid ability window (P) (R) (S)"),
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerBackToCorp,
            links: [{find: '#link', replace: true, link: '#5.6.2.a'}],
          }),
        },
      ],
    },
  ],
};

const area562_c: Area = {
  side: 'corp',
  rules: [
    {
      id: '#5.6.2.b',
      entry: [
        {
          type: 'interact',
          message: plain('Does the corp have any unspent [click]?'),
          composition: 'vertical',
          links: [
            {answer: 'Yes', action: 'Take an action.'},
            {answer: 'No', target: '#5.6.2.d'},
          ],
        },
      ],
    },
    {
      id: '#5.6.2.c',
      entry: [
        {
          type: 'interact',
          links: [{target: '#5.6.2.a', action: 'Return to (a)'}],
        },
      ],
    },
    {
      id: '#5.6.2.d',
      entry: [
        {
          type: 'detail',
          summary: plain('Action phase ends'),
          expanded: [verbatim(rule('5.6.2.d'))],
        },
        {
          type: 'interact',
          links: [{target: '#5.6.3', action: 'Discard Phase'}],
        },
      ],
    },
  ],
};

export const corpAction: Section = {
  id: '#5.6.2',
  name: 'Action Phase',
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area562_a]),
        balanceAreas([area562_b]),
        balanceAreas([area562_c]),
      ],
    },
  ],
};
