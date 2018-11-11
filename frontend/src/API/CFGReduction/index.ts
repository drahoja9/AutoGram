//#region imports
import { CFGReductionRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function CFGReduce(data: CFGReductionRequest) {
  return post('/algorithms/grammar_reduction', data);
}