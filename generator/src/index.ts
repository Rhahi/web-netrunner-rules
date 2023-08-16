// import {data as runData} from './data/run';
import {data as turnCorpData} from './data/corpTurn';
import {save} from './utils';

const dest = '../data';
// save(dest, runData, '.json');
save(dest, turnCorpData, 'corp-turn');
