//#region imports
import { DerivationRequest } from 'lib/types';
import { post } from './Base';
//#endregion

export function derivate(data: DerivationRequest) {
  return post('/algorithms/regexp_derivation', data);
}