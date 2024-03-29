//#region imports
import { combineReducers } from 'redux';
import { compare, State as ComparisonState } from './comparison';
import { transform, State as TransformationState } from './transformation';
import { determinize, State as DeterminizationState } from './determinization';
import { minimize, State as MinimizationState } from './minimization';
import { derivate, State as DerivationState } from './derivation';
import { epsremove, State as EpsremovalState } from './epsremoval';
import { CFGReduce, State as CFGReductionState } from './CFGReduction';
import { CFGEpsRemove, State as CFGEpsRemovalState } from './CFGEpsRemoval';
import { CFGUnitRemove, State as CFGUnitRemovalState } from './CFGUnitRemoval';
import { cnfaction, State as CnfState } from './cnf';
import { leftrecremove, State as LeftrecremovalState } from './leftrecremoval';
import { cykaction, State as CykState } from './cyk';

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
  CFGReduce: CFGReductionState,
  CFGEpsRemove: CFGEpsRemovalState,
  CFGUnitRemove: CFGUnitRemovalState,
  cnfaction: CnfState,
  leftrecremove: LeftrecremovalState,
  cykaction: CykState
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
  CFGReduce,
  CFGEpsRemove,
  CFGUnitRemove,
  cnfaction,
  leftrecremove,
  cykaction
});
