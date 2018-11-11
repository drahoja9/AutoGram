//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { CFGUnitRemovalRequest, CFGUnitRemovalResponse } from 'lib/types';
//#endregion

export const CFGUnitRemove = {
  request: createAction(types.CFGUNITREMOVAL_REQUEST, (data: CFGUnitRemovalRequest) =>
    ({ type: types.CFGUNITREMOVAL_REQUEST, payload: data })
  ),

  success: createAction(types.CFGUNITREMOVAL_SUCCESS, (data: CFGUnitRemovalResponse) =>
    ({ type: types.CFGUNITREMOVAL_SUCCESS, payload: data })
  ),

  cancel: createAction(types.CFGUNITREMOVAL_CANCEL, () =>
    ({ type: types.CFGUNITREMOVAL_CANCEL })
  ),

  fail: createAction(types.CFGUNITREMOVAL_FAIL, (err: Error) =>
    ({ type: types.CFGUNITREMOVAL_FAIL, payload: err })
  )
};

export type CFGUnitRemovalAction = $Call<$Values<typeof CFGUnitRemove>>;
