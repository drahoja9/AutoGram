//#region imports
import { getType } from 'typesafe-actions';
import {
  derivate as derivateAction,
  DerivationAction
} from 'actions/derivation';

import { DerivationResponse } from 'lib/types';
//#endregion

export interface State {
  result: DerivationResponse | null;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  }
}

const initialState: State = {
  result: null,
  meta: {
    error: null,
    pending: false,
    retrieved: false
  }
};

/** Derivation reducer. */
export const derivate = (state = initialState, action: DerivationAction): State => {
  switch (action.type) {
    case getType(derivateAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(derivateAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(derivateAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(derivateAction.fail):
      return {
        ...state,
        meta: {
          error: action.payload,
          pending: false,
          retrieved: true
        }
      };

    default:
      return state;
  }
}
