import {Page, Topic} from '../types';
import {corpDraw} from './turn/corpDraw';
import {corpAction} from './turn/corpAction';
import {corpDiscard} from './turn/corpDiscard';
import {runnerAction} from './turn/runnerAction';
import {runnerDiscard} from './turn/runnerDiscard';

const corp: Topic = {
  name: "Steps of the Corp's Turn",
  id: '#5.6',
  sections: [corpDraw, corpAction, corpDiscard],
};

const runner: Topic = {
  name: "Steps of the Runner's Turn",
  id: '#5.7',
  sections: [runnerAction, runnerDiscard],
};

export const data: Page = {
  title: 'Steps of a Turn',
  topics: [corp, runner],
};
