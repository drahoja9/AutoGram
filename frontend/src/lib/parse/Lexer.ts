/**
 * Abstract base convenience class for all lexers.
 */
export default abstract class LexerBase<TokType, Token> {
  /** Currenly inspected character. */
  protected curr: string;
  /** Source buffer that is currently being lexed. Always ends with a nul character. */
  protected buff: string;
  /** Next token to be lexed. */
  protected nextTok: Token;

  /**
   * Constructs basic lexer with provided source buffer.
   * @param buff Source buffer to be lexed.
   */
  constructor(buff: string) {
    this.buff = buff + '\0';
    this.advance();
  }

  /** Returns a next lexed token. */
  public lex(): Token {
    const tok = this.nextTok;
    if (!this.isEof()) {
      this.lexImpl();
    }
    return tok;
  }

  /**
   * Returns a next token to be lexed, without actualy
   * moving a buffer pointer.
   */
  public peekNext(): Token {
    return this.nextTok;
  }

  /** Updateds current buffer */
  protected advance(): void {
    this.curr = this.buff[0];
    this.buff = this.buff.slice(1, this.buff.length);
  }

  /**
   * Creates a new token of provided type and sets it as a next token.
   * @param type A type of the new token.
   * @param value Value of the new token.
   */
  protected abstract formToken(type: TokType, value: string | null): void;

  /**
   * Actualy perform lexing of the next token.
   */
  protected abstract lexImpl(): void;

  /**
   * Retuerns `true` if current token is Eof, `false` otherwise.
   */
  protected abstract isEof(): boolean;
}

