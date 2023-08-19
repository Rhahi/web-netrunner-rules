// import {data as runData} from './data/run';
import {data as turnData} from './data/turn';
import {data as runData} from './data/run';
import {save} from './utils';

const dest = '../data';
save(dest, turnData, 'turn');
save(dest, runData, 'run');
