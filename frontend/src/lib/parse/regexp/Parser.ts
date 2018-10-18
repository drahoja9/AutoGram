//#region impotrs
import { RE, REType, RENode, NodeType } from 'lib/types';
import { Term } from 'lib/types/RE';
import { Lexer, Token, TokType } from './Lexer';
import Visitor from './Visitor';
import {
  UnexpectedTokenError,
  UnterminatedParenthesisError,
} from '../exceptions';
//#endregion

/**
 * LL(1) parser for regular expressions.
 */
export class Parser {
  /** Currently considered token. */
  private tok: Token;
  /** LL(1) lexer. */
  private lexer: Lexer;

  /**
   * Constructs a parser with provided buffer.
   * @param buff A buffer to be parsed.
   */
  constructor(buff: string) {
    this.lexer = new Lexer(buff);
    this.tok = this.lexer.lex();
  }

  /** Performs parsing of given buffer and returns parsed regular expression. */
  public parse(): RE {
    const expr = this.parseExpression();
    const extractor = new AlphabetExtractor();
    extractor.visit(expr);

    return {
      type: REType.Unbounded,
      alphabet: extractor.getAlphabet(),
      value: expr
    };
  }

  /**
   * Expr ::=
   *    Alter
   *    Concat
   *    Primary Postfix
   */
  private parseExpression(): RENode {
    return this.parseAlter();
  }

  /**
   * Alter ::=
   *    Concat AlterRhs
   */
  private parseAlter(): RENode {
    return this.parseAlterRhs([this.parseConcat()]);
  }

  /**
   * AlterRhs ::=
   *    epsilon
   *    '+' Concat AlterRhs
   */
  private parseAlterRhs(lhs: RENode[]): RENode {
    while (true) {
      switch (this.tok.getType()) {
      case TokType.Eof:
      case TokType.R_Paren:
        return lhs.length === 1 ? lhs[0] : this.makeAlter(lhs);

      case TokType.Plus:
        this.consumeToken();
        lhs.push(this.parseConcat());
        break;

      default:
        throw new UnexpectedTokenError(this.tok.getString());
      }
    }
  }

  /**
   * Concat ::=
   *    Primary ConcatRhs
   */
  private parseConcat(): RENode {
    const prim = this.parsePrimary();
    return this.parseConcatRhs([this.parsePostfix(prim)]);
  }

  /**
   * ConcatRhs ::=
   *    epsilon
   *    Primary Postfix ConcatRhs
   *    '.' Primary Postfix ConcatRhs
   */
  private parseConcatRhs(lhs: RENode[]): RENode {
    while (true) {
      switch (this.tok.getType()) {
      case TokType.R_Paren:
      case TokType.Plus:
      case TokType.Eof:
        return lhs.length === 1 ? lhs[0] : this.makeConcat(lhs);

      case TokType.Dot:
      case TokType.L_Paren:
      case TokType.Char:
      case TokType.Epsilon:
      case TokType.EmptyString:
        this.consumeIf(TokType.Dot);
        lhs.push(this.parsePostfix(this.parsePrimary()));
        break;

      default:
        throw new UnexpectedTokenError(this.tok.getString());
      }
    }
  }

  /**
   * Priamry ::=
   *    Epsilon
   *    EmptySymbol
   *    Term
   *    '(' Expr ')'
   */
  private parsePrimary(): RENode {
    switch (this.tok.getType()) {

    case TokType.Epsilon:
      this.consumeToken();
      return this.makeEpsilon();

    case TokType.EmptyString:
      this.consumeToken();
      return this.makeEmptySymbol();

    case TokType.Char:
      const tok = this.tok;
      this.consumeToken();
      return this.makeTerm(tok.getValue());

    case TokType.L_Paren:
      this.consumeToken();
      const expr = this.parseExpression();
      if (!this.consumeIf(TokType.R_Paren)) {
        throw new UnterminatedParenthesisError()
          .addFixit(`Insert a closing parenthesis \`)\`.`);
      }
      return expr;

    default:
      throw new UnexpectedTokenError(this.tok.getString());
    }
  }

  /**
   * Postfix ::=
   *    epsilon
   *    '*'
   */
  private parsePostfix(expr: RENode): RENode {
    if (this.consumeIf(TokType.Asterisk)) {
      return this.makeIter(expr);
    } else {
      return expr;
    }
  }

  /** Consumes currently considered token. */
  private consumeToken() {
    this.tok = this.lexer.lex();
  }

  /** Consumes currently considered token iff it is of provided type. */
  private consumeIf(type: TokType): boolean {
    if (this.tok.getType() === type) {
      this.consumeToken();
      return true;
    } else {
      return false;
    }
  }

  private makeAlter(value: RENode[]): RENode {
    return {
      type: NodeType.Alter,
      value
    };
  }

  private makeIter(value: RENode): RENode {
    return {
      type: NodeType.Iter,
      value
    };
  }

  private makeConcat(value: RENode[]): RENode {
    return {
      type: NodeType.Concat,
      value
    };
  }

  private makeEpsilon(): RENode {
    return {
      type: NodeType.Epsilon
    };
  }

  private makeEmptySymbol(): RENode {
    return {
      type: NodeType.EmptySymbol
    };
  }

  private makeTerm(value: string): RENode {
    return {
      type: NodeType.Term,
      value
    };
  }
}

/** Simple visitor that extract alphabet of given regular expression. */
class AlphabetExtractor extends Visitor {
  /** Aggregated alphabet. */
  private alpabet: Set<string>;

  constructor() {
    super();
    this.alpabet = new Set();
  }

  /** Returns aggregated alphabet of provided regexp. */
  public getAlphabet(): string[] {
    return Array.from(this.alpabet);
  }

  public visitTerm(node: Term) {
    this.alpabet.add(node.value);
  }
}

