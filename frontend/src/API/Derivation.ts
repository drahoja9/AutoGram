//#region imports
import { RE } from 'lib/types';
import { post } from './Base';
//#endregion

export function derivate(data: { 'regexp': RE, 'derivation_string': string }) {
  return post('/algorithms/regexp_derivation', data);
}