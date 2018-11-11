//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { CFGEpsRemovalRequest, CFGEpsRemovalResponse } from 'lib/types';
//#endregion

export const CFGEpsRemove = {
  request: createAction(types.CFGEPSREMOVAL_REQUEST, (data: CFGEpsRemovalRequest) =>
    ({ type: types.CFGEPSREMOVAL_REQUEST, payload: data })
  ),

  success: createAction(types.CFGEPSREMOVAL_SUCCESS, (data: CFGEpsRemovalResponse) =>
    ({ type: types.CFGEPSREMOVAL_SUCCESS, payload: data })
  ),

  cancel: createAction(types.CFGEPSREMOVAL_CANCEL, () =>
    ({ type: types.CFGEPSREMOVAL_CANCEL })
  ),

  fail: createAction(types.CFGEPSREMOVAL_FAIL, (err: Error) =>
    ({ type: types.CFGEPSREMOVAL_FAIL, payload: err })
  )
};

export type CFGEpsRemovalAction = $Call<$Values<typeof CFGEpsRemove>>;
