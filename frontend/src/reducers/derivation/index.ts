//#region imports
import { getType } from 'typesafe-actions';
import {
  derivate as deriveAction,
  DerivationAction
} from 'actions/derivation';

import { RE } from 'lib/types';
//#endregion

export interface State {
  steps: RE[];
  trimmed_steps: RE[];
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  }
}

const initialState: State = {
  steps: [],
  trimmed_steps: [],
  meta: {
    error: null,
    pending: false,
    retrieved: false
  }
};

/** Derivation reducer. */
export const derivate = (state = initialState, action: DerivationAction): State => {
  switch (action.type) {
    case getType(deriveAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(deriveAction.success):
      return {
        steps: action.payload.steps,
        trimmed_steps: action.payload.trimmed_steps,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(deriveAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(deriveAction.fail):
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
