//#region imports
import { CFGReductionRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function CFGreduce(data: CFGReductionRequest) {
  return post('/algorithms/grammar_reduction', data);
}