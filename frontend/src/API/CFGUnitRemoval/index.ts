//#region imports
import { CFGUnitRemovalRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function CFGUnitRemove(data: CFGUnitRemovalRequest) {
  return post('/algorithms/grammar_unit', data);
}