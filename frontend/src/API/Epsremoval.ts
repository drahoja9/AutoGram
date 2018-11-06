//#region imports
import { ENFA } from 'lib/types';
import { post } from './Base';
//#endregion

export function epsremove(data: ENFA) {
  return post('/algorithms/automaton_epsilon', data);
}