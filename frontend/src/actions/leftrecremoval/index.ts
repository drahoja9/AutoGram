//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { LeftRecRemovalRequest, LeftRecRemovalResponse } from 'lib/types';
//#endregion

export const leftrecremove = {
  request: createAction(types.LEFTRECREMOVAL_REQUEST, (data: LeftRecRemovalRequest) =>
    ({ type: types.LEFTRECREMOVAL_REQUEST, payload: data })
  ),

  success: createAction(types.LEFTRECREMOVAL_SUCCESS, (data: LeftRecRemovalResponse) =>
    ({ type: types.LEFTRECREMOVAL_SUCCESS, payload: data })
  ),

  cancel: createAction(types.LEFTRECREMOVAL_CANCEL, () =>
    ({ type: types.LEFTRECREMOVAL_CANCEL })
  ),

  fail: createAction(types.LEFTRECREMOVAL_FAIL, (err: Error) =>
    ({ type: types.LEFTRECREMOVAL_FAIL, payload: err })
  )
};

export type LeftrecremovalAction = $Call<$Values<typeof leftrecremove>>;
