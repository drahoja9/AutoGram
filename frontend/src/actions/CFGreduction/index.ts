//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { CFGReductionRequest, CFGReductionResponse } from 'lib/types';
//#endregion

export const CFGreduce = {
  request: createAction(types.CFGREDUCTION_REQUEST, (data: CFGReductionRequest) =>
    ({ type: types.CFGREDUCTION_REQUEST, payload: data })
  ),

  success: createAction(types.CFGREDUCTION_SUCCESS, (data: CFGReductionResponse) =>
    ({ type: types.CFGREDUCTION_SUCCESS, payload: data })
  ),

  cancel: createAction(types.CFGREDUCTION_CANCEL, () =>
    ({ type: types.CFGREDUCTION_CANCEL })
  ),

  fail: createAction(types.CFGREDUCTION_FAIL, (err: Error) =>
    ({ type: types.CFGREDUCTION_FAIL, payload: err })
  )
};

export type CFGreductionAction = $Call<$Values<typeof CFGreduce>>;
