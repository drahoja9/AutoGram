//#region imports
import { combineReducers } from 'redux';
import { compare, State as ComparisonState } from './comparison';
import { transform, State as TransformationState } from './transformation';
//#endregion

/**
 * Application root state.
 *
 * This is an object representing a whole application state
 * which is managed by Redux.
 */
export interface RootState {
  compare: ComparisonState,
  transform: TransformationState
}

/**
 * Application root reducer.
 */
export const rootReducer = combineReducers<RootState>({
  compare,
  transform
});
