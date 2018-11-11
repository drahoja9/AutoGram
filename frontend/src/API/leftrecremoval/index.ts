//#region imports
import { LeftRecRemovalRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function leftrecremove(data: LeftRecRemovalRequest) {
  return post('/algorithms/grammar_left_recursion', data);
}