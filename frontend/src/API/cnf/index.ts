//#region imports
import { CNFRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function cnfaction(data: CNFRequest) {
  return post('/algorithms/grammar_cnf', data);
}