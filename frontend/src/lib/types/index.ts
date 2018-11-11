//#region imports
import { DFA, NFA } from './FA';
import { RRG, CFG, CNF } from './GR';
import { RE } from './RE';
//#endregion imports

export interface ComparisonRequest {
  lhs: NFA | RRG | RE;
  rhs: NFA | RRG | RE;
}

export interface ComparisonResponse {
  result: boolean;
}

export enum TransformationTarget {
  FA = 'fa',
  RRG = 'rg',
  Regexp = 're',
  CFG = 'cfg',
  PDA = 'pda',
}

export interface TransformRequest {
  target: TransformationTarget;
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
  steps: RE[];
  trimmed_steps: RE[];
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

export interface CYKRequest {
  grammar: CNF;
  cyk_string: string;
}
export interface CYKResponse {
  result: boolean;
  step_table: any;
}

// Reexport all types.
export * from './FA';
export * from './PDA';
export * from './GR';
export * from './RE';
