//#region imports
import { getType } from 'typesafe-actions';
import {
  determinize as determinizeAction,
  DeterminizationAction
} from 'actions/determinization';

import { DFA } from 'lib/types';
//#endregion

export interface State {
  result: DFA | null;
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

/** Determinization reducer. */
export const determinize = (state = initialState, action: DeterminizationAction): State => {
  switch (action.type) {
    case getType(determinizeAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(determinizeAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(determinizeAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(determinizeAction.fail):
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
