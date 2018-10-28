//#region imports
import { getType } from 'typesafe-actions';
import {
  epsremove as epsremoveAction,
  EpsremovalAction
} from 'actions/epsremoval';

import { NFA } from 'lib/types';
//#endregion

export interface State {
  result: NFA | null;
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

/** Transformation reducer. */
export const epsremove = (state = initialState, action: EpsremovalAction) : State => {
  switch (action.type) {
  case getType(epsremoveAction.request):
    return {
      ...state,
      meta: {
        ...state.meta,
        error: null,
        pending: true
      }
    };

  case getType(epsremoveAction.success):
  return {
    result: action.payload,
    meta: {
      ...state.meta,
      pending: false,
      retrieved: true
    }
  };

  case getType(epsremoveAction.cancel):
    return {
      ...state,
      meta: {
        ...state.meta,
        pending: false
      }
    };

  case getType(epsremoveAction.fail):
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
