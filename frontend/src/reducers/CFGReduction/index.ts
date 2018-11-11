//#region imports
import { getType } from 'typesafe-actions';
import {
  CFGReduce as CFGReduceAction,
  CFGReductionAction
} from 'actions/CFGReduction';

import { CFGReductionResponse } from 'lib/types';
//#endregion

export interface State {
  result: CFGReductionResponse | null;
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

/** CFGReduction reducer. */
export const CFGReduce = (state = initialState, action: CFGReductionAction): State => {
  switch (action.type) {
    case getType(CFGReduceAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(CFGReduceAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(CFGReduceAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(CFGReduceAction.fail):
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
