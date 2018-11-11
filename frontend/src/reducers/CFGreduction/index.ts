//#region imports
import { getType } from 'typesafe-actions';
import {
  CFGreduce as CFGreduceAction,
  CFGreductionAction
} from 'actions/CFGreduction';

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

/** CFGreduction reducer. */
export const CFGreduce = (state = initialState, action: CFGreductionAction): State => {
  switch (action.type) {
    case getType(CFGreduceAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(CFGreduceAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(CFGreduceAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(CFGreduceAction.fail):
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
