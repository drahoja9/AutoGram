//#region imports
import { getType } from 'typesafe-actions';
import {
  CFGUnitRemove as CFGUnitRemoveAction,
  CFGUnitRemovalAction
} from 'actions/CFGUnitRemoval';

import { CFGUnitRemovalResponse } from 'lib/types';
//#endregion

export interface State {
  result: CFGUnitRemovalResponse | null;
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

/** CFGUnitRemoval reducer. */
export const CFGUnitRemove = (state = initialState, action: CFGUnitRemovalAction): State => {
  switch (action.type) {
    case getType(CFGUnitRemoveAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(CFGUnitRemoveAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(CFGUnitRemoveAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(CFGUnitRemoveAction.fail):
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
