//#region imports
import { getType } from 'typesafe-actions';
import { merge } from 'lodash';
import {
  transform as transformAction,
  TransformationAction
} from 'actions/transformation';
//#endregion

export interface State {
  result: boolean;
  meta: {
    error: Error | null;
    pending: boolean;
    retrieved: boolean;
  }
}

const initialState: State = {
  result: false,
  meta: {
    error: null,
    pending: false,
    retrieved: false
  }
};

/** Transformation reducer. */
export const transform = (state = initialState, action: TransformationAction) : State => {
  switch (action.type) {
    case getType(transformAction.request):
      return merge({}, state, {
        meta: {
          error: null,
          pending: true
        }
      });
    
    case getType(transformAction.success):
      return merge({}, state, {
        result: action.payload,
        meta: {
          pending: false,
          retrieved: true
        }
      });
    
    case getType(transformAction.cancel):
      return merge({}, state, {
        meta: {
          pending: false,
        }
      });

    case getType(transformAction.fail):
      return merge({}, state, {
        meta: {
          error: action.payload,
          pending: false,
          retrieved: true
        }
      });
    
    default:
      return state;
  }
}
