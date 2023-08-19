import {Page, Topic} from '../types';
import {corpDraw} from './corpTurn/draw';
import {corpAction} from './corpTurn/action';
import {corpDiscard} from './corpTurn/discard';
import {runnerAction} from './runnerTurn/action';
import {runnerDiscard} from './runnerTurn/discard';

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
