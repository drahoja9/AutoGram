//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { CYKRequest, CYKResponse } from 'lib/types';
//#endregion

export const cykaction = {
  request: createAction(types.CYK_REQUEST, (data: CYKRequest) =>
    ({ type: types.CYK_REQUEST, payload: data })
  ),

  success: createAction(types.CYK_SUCCESS, (data: CYKResponse) =>
    ({ type: types.CYK_SUCCESS, payload: data })
  ),

  cancel: createAction(types.CYK_CANCEL, () =>
    ({ type: types.CYK_CANCEL })
  ),

  fail: createAction(types.CYK_FAIL, (err: Error) =>
    ({ type: types.CYK_FAIL, payload: err })
  )
};

export type CykAction = $Call<$Values<typeof cykaction>>;
