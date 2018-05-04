/**
 * Possible finite automata types.
 */
export enum FAType {
  /** Deterministic FA */
  DFA = 'DFA',
  /** Non-deterministic FA */
  NFA = 'NFA',
  /** Non-deterministic FA with possible epsilon transitions */
  ENFA = 'EpsilonNFA'
}

/**
 * Base properties shared between all types of `FA`.
 */
export interface FABase {
  states: string[],
  input_alphabet: string[],
  initial_states: string[],
  final_states: string[]
}

/**
 * This interface represents a deterministic FA.
 */
export interface DFA extends FABase {
  type: FAType.DFA;
  transistions: { from: string, input: string, to: string }[];
}

/**
 * This interface represents a non-teterministic FA.
 */
export interface NFA extends FABase {
  type: FAType.NFA,
  transistions: { from: string, input: string, to: string }[];
}

/**
 * This interface represents a non-teterministic FA with possible epsilon transitions.
 */
export interface ENFA extends FABase {
  type: FAType.NFA,
  transistions: { from: string, input: string | null, to: string }[];
}

/** Type representing one of `DFA`, `NFA` or `ENFA` */
export type FA = DFA | NFA | ENFA;
