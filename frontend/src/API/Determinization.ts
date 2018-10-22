//#region imports
import { NFA } from 'lib/types';
import { post } from './Base';
//#endregion

export function determinize(data: NFA) {
  return post('algorithms/automaton_determinization', data);
}