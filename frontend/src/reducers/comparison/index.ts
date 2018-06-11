//#region imports
import { getType } from 'typesafe-actions';
import { merge } from 'lodash';
import {
  compare as compareAction,
  ComparisonAction
} from 'actions/comparison';
//#endregion

export interface State {
  result: boolean;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  };
}

const initialState: State = {
  result: false,
  meta: {
    error: null,
    pending: false,
    retrieved: false
  }
};

/** Comparison reducer. */
export const compare = (state = initialState, action: ComparisonAction): State => {
  switch (action.type) {
  case getType(compareAction.request):
    return {
      ...state,
      meta: {
        ...state.meta,
        error: null,
        pending: true
      }
    };

  case getType(compareAction.success):
    return {
      result: action.payload.result,
      meta: {
        ...state.meta,
        pending: false,
        retrieved: true
      }
    };

  case getType(compareAction.cancel):
    return {
      ...state,
      meta: {
        ...state.meta,
        pending: false
      }
    };

  case getType(compareAction.fail):
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
