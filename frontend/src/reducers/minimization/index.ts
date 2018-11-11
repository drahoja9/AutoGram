//#region imports
import { getType } from 'typesafe-actions';
import {
  minimize as minimizeAction,
  MinimizationAction
} from 'actions/minimization';

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

/** Minimization reducer. */
export const minimize = (state = initialState, action: MinimizationAction): State => {
  switch (action.type) {
    case getType(minimizeAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(minimizeAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(minimizeAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(minimizeAction.fail):
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
