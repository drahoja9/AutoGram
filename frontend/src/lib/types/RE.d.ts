/**
 * Possible regular expression types.
 */
export declare enum REType {
  /** Unbounded regular expression */
  Unbounded = "UnboundedRegExp"
}

export declare enum NodeType {
  Concat = 'concatenation',
  Iter = 'iteration',
  Alter = 'alternation',
  Term = 'term',
  Epsilon = 'epsilon',
  EmptySymbol = 'empty_symbol'
}

/** Concatenation of two or more nodes. */
export interface Concat {
  type: NodeType.Concat;
  value: RENode[];
}

/** Iteration of a node. */
export interface Iter {
  type: NodeType.Iter;
  value: RENode;
}

/** Alternation of two or more nodes. */
export interface Alter {
  type: NodeType.Iter;
  value: RENode[];
}

/** Terminal node. */
export interface Term {
  type: NodeType.Term;
  value: string;
}

/** Epsilon node representation. */
export interface Epsilon {
  type: NodeType.Epsilon;
}

/** Empty string representation. */
export interface EmptySymbol {
  type: NodeType.EmptySymbol;
}

/**  */
export type RENode = Concat | Iter | Alter | Term | Epsilon | EmptySymbol;

export interface RE {
  type: REType;
  alphabet: string[];
  value: RENode;
}
