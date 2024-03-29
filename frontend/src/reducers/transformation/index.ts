//#region imports
import { getType } from 'typesafe-actions';
import {
  transform as transformAction,
  TransformationAction
} from 'actions/transformation';

import { TransformResponse } from 'lib/types';
//#endregion

export interface State {
  result: TransformResponse | null;
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
export const transform = (state = initialState, action: TransformationAction): State => {
  switch (action.type) {
    case getType(transformAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(transformAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(transformAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(transformAction.fail):
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
