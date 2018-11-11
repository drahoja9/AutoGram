//#region imports
import { CFGEpsRemovalRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function CFGEpsRemove(data: CFGEpsRemovalRequest) {
  return post('/algorithms/grammar_epsilon', data);
}