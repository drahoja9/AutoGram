//#region imports
import { combineReducers } from 'redux';
import { compare, State as ComparisonState } from './comparison';
import { transform, State as TransformationState } from './transformation';
import { determinize, State as DeterminizationState } from './determinization';
import { minimize, State as MinimizationState } from './minimization';
//#endregion

/**
 * Application root state.
 *
 * This is an object representing a whole application state
 * which is managed by Redux.
 */
export interface RootState {
  compare: ComparisonState,
  transform: TransformationState,
  determinize: DeterminizationState,
  minimize: MinimizationState
}

/**
 * Application root reducer.
 */
export const rootReducer = combineReducers<RootState>({
  compare,
  transform,
  determinize,
  minimize
});
