//#region imports
import { DFA } from 'lib/types';
import { post } from './Base';
//#endregion

export function minimize(data: DFA) {
  //return post('/algorithms/automaton_determinization', data);
  return post('/algorithms/automaton_minimization', data);
}