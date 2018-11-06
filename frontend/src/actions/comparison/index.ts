//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { ComparisonRequest, ComparisonResponse } from 'lib/types';
//#endregion

export const compare = {
  request: createAction(types.COMPARISON_REQUEST, (data: ComparisonRequest) =>
    ({ type: types.COMPARISON_REQUEST, payload: data })
  ),

  success: createAction(types.COMPARISON_SUCCESS, (data: ComparisonResponse) =>
    ({ type: types.COMPARISON_SUCCESS, payload: data })
  ),

  cancel: createAction(types.COMPARISON_CANCEL, () =>
    ({ type: types.COMPARISON_CANCEL })
  ),

  fail: createAction(types.COMPARISON_FAIL, (err: Error) =>
    ({ type: types.COMPARISON_FAIL, payload: err })
  )
};

export type ComparisonAction = $Call<$Values<typeof compare>>;
