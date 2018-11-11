//#region imports
import { getType } from 'typesafe-actions';
import {
  cykaction as cykactionAction,
  CykAction
} from 'actions/cyk';

import { CYKResponse } from 'lib/types';
//#endregion

export interface State {
  result: CYKResponse | null;
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

/** Cyk reducer. */
export const cykaction = (state = initialState, action: CykAction): State => {
  switch (action.type) {
    case getType(cykactionAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(cykactionAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(cykactionAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(cykactionAction.fail):
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
