/**
 * Possible grammar types
 */
export enum GRType {
  /** Right regular grammar */
  RRG = 'RightRG',
  /** Context-free grammar */
  CFG = 'CFG',
  /** Epsilon free context-free grammar */
  EFCFG = 'EpsilonFreeCFG',
  /** Grammar in Chomnsky normal form */
  CNF = 'CNF'
}

/**
 * Base properties shared between all types of `GR`.
 */
interface GRBase {
  nonterminal_alphabet: string[];
  terminal_alphabet: string[];
  initial_symbol: string;
}

/**
 * This interface represents a right regular grammar.
 */
export interface RRG extends GRBase {
  type: GRType.RRG;
  rules: {
    from: string;
    to: string[];
  }[];
  generates_epsilon: boolean;
}

/**
 * This interface represents a context-free grammar.
 */
export interface CFG extends GRBase {
  type: GRType.CFG;
  rules: {
    from: string;
    to: string[] | [null];
  }[];
}

/**
 * This interface represents an epsilon-free `CFG`.
 */
export interface EFCFG extends GRBase {
  type: GRType.EFCFG;
  rules: {
    from: string;
    to: string[];
  }[];
}

/**
 * This interface represents a grammar in Chomsky normal form.
 */
export interface CNF extends GRBase {
  type: GRType.CNF;
  rules: {
    from: string;
    to: string[];
  }[];
  generates_epsilon: boolean;
}

/** Type representing one of `RRG`, `CFG`, `EFCFG` or `CNF` */
export type GR = RRG | CFG | EFCFG | CNF;
