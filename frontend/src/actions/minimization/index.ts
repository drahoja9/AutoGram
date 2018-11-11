//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { DFA } from 'lib/types';
//#endregion

export const minimize = {
  request: createAction(types.MINIMIZATION_REQUEST, (data: DFA) =>
    ({ type: types.MINIMIZATION_REQUEST, payload: data })
  ),

  success: createAction(types.MINIMIZATION_SUCCESS, (data: DFA) =>
    ({ type: types.MINIMIZATION_SUCCESS, payload: data })
  ),

  cancel: createAction(types.MINIMIZATION_CANCEL, () =>
    ({ type: types.MINIMIZATION_CANCEL })
  ),

  fail: createAction(types.MINIMIZATION_FAIL, (err: Error) =>
    ({ type: types.MINIMIZATION_FAIL, payload: err })
  )
};

export type MinimizationAction = $Call<$Values<typeof minimize>>;
