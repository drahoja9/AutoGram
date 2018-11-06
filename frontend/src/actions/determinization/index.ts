//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { NFA, DFA } from 'lib/types';
//#endregion

export const determinize = {
  request: createAction(types.DETERMINIZATION_REQUEST, (data: NFA) =>
    ({ type: types.DETERMINIZATION_REQUEST, payload: data })
  ),

  success: createAction(types.DETERMINIZATION_SUCCESS, (data: DFA) =>
    ({ type: types.DETERMINIZATION_SUCCESS, payload: data })
  ),

  cancel: createAction(types.DETERMINIZATION_CANCEL, () =>
    ({ type: types.DETERMINIZATION_CANCEL })
  ),

  fail: createAction(types.DETERMINIZATION_FAIL, (err: Error) =>
    ({ type: types.DETERMINIZATION_FAIL, payload: err })
  )
};

export type DeterminizationAction = $Call<$Values<typeof determinize>>;
