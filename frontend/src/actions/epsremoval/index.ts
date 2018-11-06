//#region imports
import { $Values, $Call } from 'utility-types';
import { createAction } from 'typesafe-actions';
import * as types from './constants';

import { ENFA, NFA } from 'lib/types';
//#endregion

export const epsremove = {
  request: createAction(types.EPSREMOVAL_REQUEST, (data: ENFA) => 
    ({type: types.EPSREMOVAL_REQUEST, payload: data})
  ),

  success: createAction(types.EPSREMOVAL_SUCCESS, (data: NFA) => 
    ({type: types.EPSREMOVAL_SUCCESS, payload: data})
  ),

  cancel: createAction(types.EPSREMOVAL_CANCEL, () => 
    ({type: types.EPSREMOVAL_CANCEL})
  ),

  fail: createAction(types.EPSREMOVAL_FAIL, (err: Error) => 
    ({type: types.EPSREMOVAL_FAIL, payload: err})
  )
};

export type EpsremovalAction = $Call<$Values<typeof epsremove>>;
