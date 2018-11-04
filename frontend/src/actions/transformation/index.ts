//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { TransformRequest, TransformResponse } from 'lib/types';
//#endregion

export const transform = {
  request: createAction(types.TRANSFORMATION_REQUEST, (data: TransformRequest) =>
    ({ type: types.TRANSFORMATION_REQUEST, payload: data })
  ),

  // Create new type for REGEXP result?
  success: createAction(types.TRANSFORMATION_SUCCES, (data: TransformResponse) =>
    ({ type: types.TRANSFORMATION_SUCCES, payload: data })
  ),

  cancel: createAction(types.TRANSFORMATION_CANCEL, () =>
    ({ type: types.TRANSFORMATION_CANCEL })
  ),

  fail: createAction(types.TRANSFORMATION_FAIL, (err: Error) =>
    ({ type: types.TRANSFORMATION_FAIL, payload: err })
  )
};

export type TransformationAction = $Call<$Values<typeof transform>>;
