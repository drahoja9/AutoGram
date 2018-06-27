//#region imports
import { RENode, NodeType } from 'lib/types';
import { Concat, Iter, Alter, Term, Epsilon, EmptySymbol } from 'lib/types';
//#endregion

/**
 * A simple regular expression AST visitor.
 */
export default class Visitor {
  public visitConcat(node: Concat) {
    for (const child of node.value) {
      this.visit(child);
    }
  }

  public visitIter(node: Iter) {
    this.visit(node.value);
  }

  public visitAlter(node: Alter) {
    for (const child of node.value) {
      this.visit(child);
    }
  }

  public visitTerm(node: Term) {}

  public visitEpsilon(node: Epsilon) {}

  public visitEmptySymbol(node: EmptySymbol) {}

  /** Default visitor method */
  public visit(node: RENode) {
    switch (node.type) {
      case NodeType.Concat:
        return this.visitConcat(node as Concat)
      case NodeType.Iter:
        return this.visitIter(node as Iter)
      case NodeType.Alter:
        return this.visitAlter(node as Alter)
      case NodeType.Term:
        return this.visitTerm(node as Term)
      case NodeType.Epsilon:
        return this.visitEpsilon(node as Epsilon)
      case NodeType.EmptySymbol:
        return this.visitEmptySymbol(node as EmptySymbol)
    }
  }
}
