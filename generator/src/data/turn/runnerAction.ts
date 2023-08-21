import {Section, Area} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const area571_a: Area = {
  side: 'runner',
  rules: [
    {
      id: '#5.7.1.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Gain clicks'),
          expanded: [verbatim(rule('5.7.1.a'))],
        },
      ],
    },
    {
      id: '#5.7.1.b',
      entry: [
        {
          type: 'detail',
          summary: plain("Runner's paid ability window (P) (R)"),
          expanded: [verbatim(rule('5.7.1.b'))],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#5.7.1.c'}],
          }),
        },
      ],
    },
  ],
};

const area571_b: Area = {
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
            links: [{find: '#link', replace: true, link: '#5.7.1.b'}],
          }),
        },
      ],
    },
  ],
};

const area571_c: Area = {
  side: 'runner',
  rules: [
    {
      id: '#5.7.1.c',
      entry: [
        {
          type: 'detail',
          summary: plain('Refill recurring credits'),
          expanded: [verbatim(rule('5.7.1.c'))],
        },
      ],
    },
    {
      id: '#5.7.1.d',
      entry: [
        {
          type: 'detail',
          summary: plain('Turn begins'),
          expanded: [verbatim(rule('5.7.1.d'))],
        },
      ],
    },
    {
      id: '#5.7.1.e',
      entry: [
        {
          type: 'detail',
          summary: plain("Runner's paid ability window (P) (R)"),
          expanded: [verbatim(rule('5.7.1.e'))],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#5.7.1.f'}],
          }),
        },
      ],
    },
  ],
};

const area571_d: Area = {
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
            links: [{find: '#link', replace: true, link: '#5.7.1.e'}],
          }),
        },
      ],
    },
  ],
};

const area571_e: Area = {
  side: 'runner',
  rules: [
    {
      id: '#5.7.1.f',
      entry: [
        {
          type: 'interact',
          message: plain('Does the runner have any unspent [click]?'),
          composition: 'vertical',
          links: [
            {answer: 'Yes', action: 'Take an action.'},
            {answer: 'No', target: '#5.7.1.h'},
          ],
        },
      ],
    },
    {
      id: '#5.7.1.g',
      entry: [
        {
          type: 'interact',
          links: [{target: '#5.7.1.e', action: 'Return to (e)'}],
        },
      ],
    },
    {
      id: '#5.7.1.h',
      entry: [
        {
          type: 'detail',
          summary: plain('Action phase ends'),
          expanded: [verbatim(rule('5.7.1.h'))],
        },
        {
          type: 'interact',
          links: [{target: '#5.7.2', action: 'Discard Phase'}],
        },
      ],
    },
  ],
};

export const runnerAction: Section = {
  id: '#5.7.1',
  name: 'Action Phase',
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area571_a]),
        balanceAreas([area571_b]),
        balanceAreas([area571_c]),
        balanceAreas([area571_d]),
        balanceAreas([area571_e]),
      ],
    },
  ],
};
