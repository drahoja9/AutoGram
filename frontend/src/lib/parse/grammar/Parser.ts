//#region import
import { Lexer, Token, TokType } from './Lexer';
//#endregion

type Rule = string[] | [null];

export class Parser {
  /** Currently considered token. */
  private tok: Token;
  /** LL(1) lexer. */
  private lexer: Lexer;

  constructor(buff: string) {
    this.lexer = new Lexer(buff);
    this.tok = this.lexer.lex();
  }

  /**
   * Sets a new buffer to parse.
   *
   * @note This method resets the parsing state.
   */
  public setBuffer(buff: string) {
    this.lexer = new Lexer(buff);
    this.tok = this.lexer.lex();
  }

  /**
   * Parses list of identifiers.
   * @example `A, B, <AC>`
   */
  public parseIdentList(): string[] {
    while (true) {
      switch (this.tok.getType()) {
      case TokType.Eof:
        return [];

      case TokType.Newline:
        // Ignore newlines
        this.consumeToken();
        break;

      case TokType.Ident:
        const first = this.tok.getValue();
        this.consumeToken();
        return this.parseIdentListBody(first);

      default:
        throw new TypeError('Unexpected token');
      }
    }
  }

  private parseIdentListBody(first: string): string[] {
    const list  = [first];
    while (true) {
      switch (this.tok.getType()) {
      case TokType.Eof:
        return list;

      case TokType.Newline:
        // Ignore newlines
        this.consumeToken();
        break;

      case TokType.Comma:
        this.consumeToken();
        list.push(this.tok.getValue());
        this.consume(TokType.Ident);
        break;

      default:
        throw new TypeError('Unexpected token.');
      }
    }
  }

  /**
   * Parses list of rules.
   *
   * @example `
   * A -> a<AB> | b
   * <AB> -> ab
   * `
   */
  public parseRules() {
    const rules = [];
    while (true) {
      switch (this.tok.getType()) {
      case TokType.Eof:
        this.consumeToken();
        return rules;

      case TokType.Newline:
        this.consumeToken();
        break;

      case TokType.Ident:
        rules.push(...this.parseRule());
        break;
      }
    }
  }

  private parseRule() {
    const from = this.tok.getValue();
    this.consume(TokType.Ident);
    this.consume(TokType.Arrow);

    return this.parseRuleBody(this.parseDest())
    .map((to) => ({ from, to }));
  }

  private parseRuleBody(first: Rule): Rule[] {
    const to = [first];
    while (true) {
      switch (this.tok.getType()) {
      case TokType.Eof:
      case TokType.Newline:
        return to;

      case TokType.Pipe:
        this.consumeToken();
        to.push(this.parseDest());
        break;

      default:
        throw new TypeError('Unexpected token.');
      }
    }
  }

  private parseDest(): Rule {
    if (this.tok.getType() === TokType.Epsilon) {
      this.consumeToken();
      return [null];
    }
    if (this.tok.getType() !== TokType.Ident) {
      throw new TypeError('Unexpected token.');
    }

    const to = [];
    while (this.tok.getType() === TokType.Ident) {
      to.push(this.tok.getValue());
      this.consumeToken();
    }
    return to;
  }

  /** Consumes currently considered token. */
  private consumeToken() {
    this.tok = this.lexer.lex();
  }

  /** Consumes token of provided type. */
  private consume(tok: TokType) {
    if (!this.consumeIf(tok)) {
      throw new TypeError(`Expected token of type\`${tok}\` but found \`${this.tok.getType()}\``);
    }
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
}
