//#region imports
import { combineReducers } from 'redux';
import { compare, State as ComparisonState } from './comparison';
import { transform, State as TransformationState } from './transformation';
import { determinize, State as DeterminizationState } from './determinization';
import { minimize, State as MinimizationState } from './minimization';
import { derivate, State as DerivationState } from './derivation';
import { epsremove, State as EpsremovalState } from './epsremoval';
import { CFGreduce, State as CFGreductionState } from './CFGreduction';

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
  minimize: MinimizationState,
  derivate: DerivationState,
  epsremove: EpsremovalState,
  CFGreduce: CFGreductionState
}

/**
 * Application root reducer.
 */
export const rootReducer = combineReducers<RootState>({
  compare,
  transform,
  determinize,
  minimize,
  derivate,
  epsremove,
  CFGreduce
});
