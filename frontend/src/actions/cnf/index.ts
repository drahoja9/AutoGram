//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { CNFRequest, CNFResponse } from 'lib/types';
//#endregion

export const cnfaction = {
  request: createAction(types.CNF_REQUEST, (data: CNFRequest) =>
    ({ type: types.CNF_REQUEST, payload: data })
  ),

  success: createAction(types.CNF_SUCCESS, (data: CNFResponse) =>
    ({ type: types.CNF_SUCCESS, payload: data })
  ),

  cancel: createAction(types.CNF_CANCEL, () =>
    ({ type: types.CNF_CANCEL })
  ),

  fail: createAction(types.CNF_FAIL, (err: Error) =>
    ({ type: types.CNF_FAIL, payload: err })
  )
};

export type CnfAction = $Call<$Values<typeof cnfaction>>;
