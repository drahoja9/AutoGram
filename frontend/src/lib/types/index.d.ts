//#region imports
import { FA, FAType, DFA, NFA, ENFA } from './FA';
import { PDA, PDAType, DPDA, NPDA } from './PDA';
import { GR, GRType, RRG, CFG, EFCFG, CNF } from './GR';
import { RE, REType } from './RE';
//#endregion imports

export interface ComparisonRequest {
  lhs: NFA | RRG | RE;
  rhs: NFA | RRG | RE;
}

export interface ComparisonResponse {
  result: boolean;
}

export interface TransformRequest {
  target: FAType.NFA | GRType.RRG | REType.Unbounded;
  source: NFA | RRG | RE;
}

export type TransformResponse = NFA | RRG | RE;

export type MinimizationRequest = DFA;
export interface MinimizationResponse {
  result: DFA;
  steps: any[];
}

export interface DerivationRequest {
  regexp: RE;
  derivation_string: string;
}

export interface DerivationResponse {
  result: RE;
  steps: RE[];
}

export type CNFRequest = CFG;
export interface CNFResponse {
  after_reduction: CFG;
  after_epsilon: CFG;
  after_unit_rules: CFG;
  result: CNF;
}

export type LeftRecRemovalRequest = CFG;
export interface LeftRecRemovalResponse {
  after_reduction: CFG;
  after_epsilon: CFG;
  after_unit_rules: CFG;
  result: CFG;
}

export type CYKRequest = CNF;
export interface CYKResponse {
  result: boolean;
  step_table: any;
}

// Reexport all types.
export { FA, FAType, DFA, NFA, ENFA } from './FA';
export { PDA, PDAType, DPDA, NPDA } from './PDA';
export { GR, GRType, RRG, CFG, EFCFG, CNF } from './GR';
export { RE, REType } from './RE';
