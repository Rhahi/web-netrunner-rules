import {Section, Area, Topic} from '../../types';
import {plain, verbatim, textc, balanceAreas} from '../../utils';
import * as boiler from '../boilerplate';
import rule from '../../official';

const prev_a: Area = {
  side: 'runner',
  rules: [],
};

const prev_b: Area = {
  side: 'corp',
  rules: [],
};

const area691: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.1.a',
      entry: [
        {
          type: 'detail',
          summary: verbatim('#6.9.1.a'),
          expanded: [
            verbatim('#6.3.2'),
            verbatim('#6.3.2.b'),
            verbatim('#6.3.4'),
          ],
        },
      ],
    },
    {
      id: '#6.9.1.b',
      entry: [
        {
          type: 'detail',
          summary: plain('Gain bad publicity credits'),
          expanded: [verbatim('#6.9.1.b')],
        },
      ],
    },
    {
      id: '#6.9.1.c',
      entry: [
        {
          type: 'detail',
          summary: plain('Run begins'),
          expanded: [verbatim('#6.9.1.c')],
        },
      ],
    },
    {
      id: '#6.9.1.d',
      entry: [
        plain('Initiation phase ends'),
        {
          type: 'interact',
          message: plain(
            'Does the attacked server have at least one piece of ice?'
          ),
          composition: 'vertical',
          links: [
            {answer: 'Yes', target: '#6.9.2'},
            {answer: 'No', target: '#6.9.4'},
          ],
        },
      ],
    },
  ],
};

const area692_a: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.2.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Approach begins'),
          expanded: [
            verbatim('#6.9.2.a'),
            textc({
              text: 'Abilities with this trigger condition can be prevented by ending of the approach phase.',
              id: '#6.4.2',
            }),
          ],
        },
      ],
    },
    {
      id: '#6.9.2.b',
      entry: [
        {
          type: 'detail',
          summary: plain("Runner's paid ability window (P) (R)"),
          expanded: [verbatim('#6.9.2.b')],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#6.9.2.c'}],
          }),
        },
      ],
    },
  ],
};

const area692_b: Area = {
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
            links: [{find: '#link', replace: true, link: '#6.9.2.b'}],
          }),
        },
      ],
    },
  ],
};

const area692_c: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.2.c',
      entry: [
        {
          type: 'detail',
          summary: plain('Approach ice phase ends'),
          expanded: [
            verbatim(
              'The Approach Ice Phase is complete. If the approached piece of ice is rezzed, continue to step 6.9.3, Encounter Ice Phase. Otherwise, proceed to step 6.9.4, Movement Phase.'
            ),
          ],
        },
        {
          type: 'interact',
          message: plain('Is the approached piece of ice rezzed?'),
          composition: 'vertical',
          links: [
            {answer: 'Yes', target: '#6.9.3', action: 'Encounter Ice Phase'},
            {answer: 'No', target: '#6.9.4', action: 'Movement Phase'},
          ],
        },
      ],
    },
  ],
};

const area693_a: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.3.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Encounter begins'),
          expanded: [
            verbatim('#6.9.3.a'),
            textc({
              id: '#6.5.2',
              text: '...Abilities with this trigger condition are subject to rule 9.2.8f.',
            }),
            verbatim('#9.2.8.f.ex1'),
          ],
        },
      ],
    },
    {
      id: '#6.9.3.b',
      entry: [
        {
          type: 'detail',
          summary: plain(boiler.P_plain_runner),
          expanded: [verbatim('#6.9.3.b'), verbatim('#6.5.8.a')],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#6.9.3.c'}],
          }),
        },
      ],
    },
  ],
};

const area693_b: Area = {
  side: 'corp',
  rules: [
    {
      entry: [
        plain(boiler.P_plain_corp),
        plain(boiler.P_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpBackToRunner,
            links: [{find: '#link', replace: true, link: '#6.9.3.b'}],
          }),
        },
      ],
    },
    {
      id: '#6.9.3.c',
      entry: [
        {
          type: 'interact',
          message: plain('Are there unbroken, unresolved subroutines?'),
          composition: 'vertical',
          links: [
            {answer: 'Yes', action: 'Resolve the next subroutine in order'},
            {answer: 'No', target: '#6.9.3.e'},
          ],
        },
      ],
    },
    {
      id: '#6.9.3.d',
      entry: [
        {
          type: 'interact',
          links: [{target: '#6.9.3.c', action: 'Return to (c)'}],
        },
      ],
    },
    {
      id: '#6.9.3.e',
      entry: [
        plain('The Encounter Ice Phase is complete.'),
        {
          type: 'interact',
          links: [{target: '#6.9.4', action: 'Movement Phase'}],
        },
      ],
    },
  ],
};

const area694_a: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.4.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Pass ice, if any.'),
          expanded: [verbatim('#6.9.4.a')],
        },
        {
          type: 'interact',
          message: plain('Are there more ice inwards?'),
          links: [{answer: 'No', action: 'Runner passed all ice.'}],
        },
      ],
    },
    {
      id: '#6.9.4.b',
      entry: [
        {
          type: 'detail',
          summary: plain(boiler.P_plain_runner),
          expanded: [verbatim('#6.9.4.b')],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#6.9.4.c'}],
          }),
        },
      ],
    },
  ],
};

const area694_b: Area = {
  side: 'corp',
  rules: [
    {
      entry: [
        plain(boiler.P_plain_corp),
        plain(boiler.P_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpBackToRunner,
            links: [{find: '#link', replace: true, link: '#6.9.4.b'}],
          }),
        },
      ],
    },
  ],
};

const area694_c: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.4.c',
      entry: [
        {
          type: 'interact',
          message: plain('Jack out?'),
          composition: 'vertical',
          links: [
            {answer: 'Yes', target: '#6.9.6', action: 'Run Ends Phase'},
            {answer: 'No', target: '#6.9.4.d'},
          ],
        },
      ],
    },
    {
      id: '#6.9.4.d',
      entry: [
        {
          type: 'detail',
          summary: plain('Move inwards'),
          expanded: [verbatim('#6.9.4.d')],
        },
      ],
    },
    {
      id: '#6.9.4.e',
      entry: [
        {
          type: 'detail',
          summary: plain(boiler.PR_plain_runner),
          expanded: [verbatim('#6.9.4.e')],
        },
        {
          type: 'interact',
          message: textc({
            text: boiler.runnerPAWPass,
            links: [{find: '#link', replace: true, link: '#6.9.4.f'}],
          }),
        },
      ],
    },
  ],
};

const area694_d: Area = {
  side: 'corp',
  rules: [
    {
      entry: [
        plain(boiler.PR_plain_corp),
        plain(boiler.PR_corp),
        {
          type: 'interact',
          message: textc({
            text: boiler.corpBackToRunner,
            links: [{find: '#link', replace: true, link: '#6.9.4.e'}],
          }),
        },
      ],
    },
  ],
};

const area694_e: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.4.f',
      entry: [
        {
          type: 'detail',
          summary: plain('Another ice?'),
          expanded: [
            verbatim(
              'If the Runner moved to a new position, return to step 6.9.2, Approach Ice Phase, approaching the piece of ice in their new position. If not, continue to (g).'
            ),
          ],
        },
        {
          type: 'interact',
          composition: 'vertical',
          links: [
            {answer: 'Yes', target: '#6.9.2', action: 'Approach Ice Phase'},
            {answer: 'No', target: '#6.9.4.g'},
          ],
        },
      ],
    },
    {
      id: '#6.9.4.g',
      entry: [
        {
          type: 'detail',
          summary: plain('Approach server'),
          expanded: [verbatim('#6.9.4.g')],
        },
      ],
    },
    {
      id: '#6.9.4.h',
      entry: [
        {
          type: 'detail',
          summary: plain('Movement phase ends'),
          expanded: [
            verbatim(
              'The Movement Phase is complete. Continue to step 6.9.5, Success Phase.'
            ),
          ],
        },
        {
          type: 'interact',
          links: [{target: '#6.9.5', action: 'Success Phase'}],
        },
      ],
    },
  ],
};

const area695: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.5.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Run is successful'),
          expanded: [
            verbatim('#6.9.5.a'),
            textc({
              text: 'Declaring a run to be successful is not the same as the Success Phase beginning. Abilities that have successful run triggers are not prevented by change of run phases.',
              id: '#6.7.3',
            }),
            verbatim('#6.7.4.a'),
            verbatim({
              text: 'If the attacked server has ceased to exist, the run is not declared unsuccessful. See rule 8.5.8.',
              id: '#6.8.4.b',
            }),
          ],
        },
      ],
    },
    {
      id: '#6.9.5.b',
      entry: [
        {
          type: 'detail',
          summary: plain('Breach server'),
          expanded: [
            verbatim('#6.9.5.b'),
            verbatim({
              text: 'If an “If successful” effect gives the Runner an effect they can optionally carry out instead of breaching, that decision is made at the time the breach would begin, in step 6.9.5b.',
              id: '#6.7.4.c',
              links: [{find: 'step 6.9.5b', replace: false, link: '#6.9.5.b'}],
            }),
          ],
        },
      ],
    },
    {
      id: '#6.9.5.c',
      entry: [
        plain('Success phase ends'),
        {
          type: 'interact',
          links: [{target: '#6.9.6', action: 'Run Ends Phase'}],
        },
      ],
    },
  ],
};

const area696: Area = {
  side: 'runner',
  rules: [
    {
      id: '#6.9.6.a',
      entry: [
        {
          type: 'detail',
          summary: plain('Priority window closes'),
          expanded: [
            verbatim(
              'Any priority windows that were open when the run moved to this phase are completed or closed as described in section 6.8.2.'
            ),
            verbatim('#6.8.2.a'),
          ],
        },
      ],
    },
    {
      id: '#6.9.6.b',
      entry: [verbatim('#6.9.6.b')],
    },
    {
      id: '#6.9.6.c',
      entry: [
        {
          type: 'detail',
          summary: plain('Unsuccessful run?'),
          expanded: [verbatim('#6.9.6.c')],
        },
      ],
    },
    {
      id: '#6.9.6.d',
      entry: [verbatim('#6.9.6.d')],
    },
  ],
};

export const initiation: Section = {
  id: '#6.9.1',
  name: rule('6.9.1'),
  groups: [
    {
      type: 'permanent',
      divisions: [balanceAreas([area691])],
    },
  ],
};

export const approach: Section = {
  id: '#6.9.2',
  name: rule('6.9.2'),
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area692_a]),
        balanceAreas([area692_b]),
        balanceAreas([area692_c]),
      ],
    },
  ],
};

export const encounter: Section = {
  id: '#6.9.3',
  name: rule('6.9.3'),
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area693_a]),
        balanceAreas([area693_b])],
    },
  ],
};

export const movement: Section = {
  id: '#6.9.4',
  name: rule('6.9.4'),
  groups: [
    {
      type: 'permanent',
      divisions: [
        balanceAreas([area694_a]),
        balanceAreas([area694_b]),
        balanceAreas([area694_c]),
        balanceAreas([area694_d]),
        balanceAreas([area694_e]),
      ],
    },
  ],
};

export const success: Section = {
  id: '#6.9.5',
  name: rule('6.9.5'),
  groups: [
    {
      type: 'permanent',
      divisions: [balanceAreas([area695])],
    },
  ],
};

export const end: Section = {
  id: '#6.9.6',
  name: rule('6.9.6'),
  groups: [
    {
      type: 'permanent',
      divisions: [balanceAreas([area696])],
    },
  ],
};
