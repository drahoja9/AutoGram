/**
 * Possible regular expression types.
 */
declare enum REType {
  /** Unbounded regular expression */
  Unbounded = "UnboundedRegExp"
}

declare enum NodeType {
  Concat = 'concatenation',
  Iter = 'iteration',
  Alter = 'alternation',
  Term = 'term',
  Epsilon = 'epsilon',
  EmptySymbol = 'empty_symbol'
}

/** Concatenation of two or more nodes. */
interface Concat {
  type: NodeType.Concat;
  value: RENode[];
}

/** Iteration of a node. */
interface Iter {
  type: NodeType.Iter;
  value: RENode;
}

/** Alternation of two or more nodes. */
interface Alter {
  type: NodeType.Iter;
  value: RENode[];
}

/** Terminal node. */
interface Term {
  type: NodeType.Term;
  value: string;
}

/** Epsilon node representation. */
interface Epsilon {
  type: NodeType.Epsilon;
}

/** Empty string representation. */
interface EmptySymbol {
  type: NodeType.EmptySymbol;
}

/**  */
type RENode = Concat | Iter | Alter | Term | Epsilon | EmptySymbol;

export interface RE {
  type: REType;
  alphabet: string[];
  value: RENode;
}
