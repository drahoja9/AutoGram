//#region imports
import { ComparisonRequest } from 'lib/types';
import { post } from './Base';
//#endregion

export function compare(data: ComparisonRequest) {
  return post('/comparison', data);
}


