//#region imports
import { CYKRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function cykaction(data: CYKRequest) {
  return post('/algorithms/grammar_cyk', data);
}