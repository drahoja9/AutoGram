//#region imports
import { combineReducers } from 'redux';
import { compare, State as ComparisonState } from './comparison';
//#endregion

/**
 * Application root state.
 *
 * This is an object representing a whole application state
 * which is managed by Redux.
 */
export interface RootState {
  compare: ComparisonState
}

/**
 * Application root reducer.
 */
export const rootReducer = combineReducers<RootState>({
  compare
});
