/**
 * Possible push-down automata types.
 */
export enum PDAType {
  DPDA = 'DPDA',
  NPDA = 'NPDA'
}

/**
 * Base properties shared between all types of `PDA`.
 */
export interface PDABase {
  states: string[];
  input_alphabet: string[];
  pushdown_store_alphabet: string[];
  initial_states: string[];
  initial_pushdown_store_symbol: string,
  final_states: string[];
}

/**
 * This interface represents a deterministic PDA.
 */
export interface DPDA extends PDABase {
  types: PDAType.DPDA;
  transitions: {
    from: string;
    input: string;
    pop: string[] | null;
    to : string;
    push: string[] | null;
  }[];
}

/**
 * This interface represents a non-deterministic PDA.
 */
export interface NPDA extends PDABase {
  types: PDAType.NPDA;
  transitions: {
    from: string;
    input: string;
    pop: string[] | null;
    to : string;
    push: string[] | null;
  }[];
}

/** Type representing one of `DPDA` or `NPDA` */
export type PDA = DPDA | NPDA;
