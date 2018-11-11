//#region imports
import { getType } from 'typesafe-actions';
import {
  CFGEpsRemove as CFGEpsRemoveAction,
  CFGEpsRemovalAction
} from 'actions/CFGEpsRemoval';

import { CFGEpsRemovalResponse } from 'lib/types';
//#endregion

export interface State {
  result: CFGEpsRemovalResponse | null;
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

/** CFGEpsRemoval reducer. */
export const CFGEpsRemove = (state = initialState, action: CFGEpsRemovalAction): State => {
  switch (action.type) {
    case getType(CFGEpsRemoveAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(CFGEpsRemoveAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(CFGEpsRemoveAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(CFGEpsRemoveAction.fail):
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
