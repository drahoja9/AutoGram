//#region imports
import { TransformRequest } from 'lib/types';
import { post } from '../Base';
//#endregion

export function transform(data: TransformRequest) {
  return post('/transformation', data);
}