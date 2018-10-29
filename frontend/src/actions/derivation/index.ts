//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { DerivationRequest, DerivationResponse } from 'lib/types';
//#endregion

export const derivate = {
  request: createAction(types.DERIVATION_REQUEST, (data: DerivationRequest) =>
    ({ type: types.DERIVATION_REQUEST, payload: data })
  ),

  // Create new type for REGEXP result?
  success: createAction(types.DERIVATION_SUCCES, (data: DerivationResponse) =>
    ({ type: types.DERIVATION_SUCCES, payload: data })
  ),

  cancel: createAction(types.DERIVATION_CANCEL, () =>
    ({ type: types.DERIVATION_CANCEL })
  ),

  fail: createAction(types.DERIVATION_FAIL, (err: Error) =>
    ({ type: types.DERIVATION_FAIL, payload: err })
  )
};

export type DerivationAction = $Call<$Values<typeof derivate>>;
