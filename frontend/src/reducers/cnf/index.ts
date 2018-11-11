//#region imports
import { getType } from 'typesafe-actions';
import {
  cnfaction as cnfactionAction,
  CnfAction
} from 'actions/cnf';

import { CNFResponse } from 'lib/types';
//#endregion

export interface State {
  result: CNFResponse | null;
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

/** Cnf reducer. */
export const cnfaction = (state = initialState, action: CnfAction): State => {
  switch (action.type) {
    case getType(cnfactionAction.request):
      return {
        ...state,
        meta: {
          ...state.meta,
          error: null,
          pending: true
        }
      };

    case getType(cnfactionAction.success):
      return {
        result: action.payload,
        meta: {
          ...state.meta,
          pending: false,
          retrieved: true
        }
      };

    case getType(cnfactionAction.cancel):
      return {
        ...state,
        meta: {
          ...state.meta,
          pending: false
        }
      };

    case getType(cnfactionAction.fail):
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
