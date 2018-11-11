//#region imports
import { getType } from 'typesafe-actions';
import {
  leftrecremove as leftrecremoveAction,
  LeftrecremovalAction
} from 'actions/leftrecremoval';

import { LeftRecRemovalResponse } from 'lib/types';
//#endregion

export interface State {
  result: LeftRecRemovalResponse | null;
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

/** Leftrecremoval reducer. */
export const leftrecremove = (state = initialState, action: LeftrecremovalAction): State => {
  switch (action.type) {
    case getType(leftrecremoveAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(leftrecremoveAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(leftrecremoveAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(leftrecremoveAction.fail):
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
