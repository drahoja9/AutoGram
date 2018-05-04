/** Represents a concrete type of the token. */
export enum TokType {
  Char = 'char', // [a-zA-Z0-9_]

  Epsilon = 'epsilon', // [a-zA-Z0-9_]

  EmptyString = 'empty_symbol', // [a-zA-Z0-9_]

  L_Paren = 'l_paren', // (
  R_Paren = 'r_paren', // )

  // Unary
  Asterisk = 'asterisk', // *

  // Binary operands
  Plus = 'plus', // +
  Dot = 'dot', // .

  // Error type
  Unknown = 'unknown',

  // End of input
  Eof = 'eof',
}

/**
 * Encapsulates an actual lexed token.
 */
export class Token {
  /** Concrete token type. */
  private type: TokType;
  /** Actual value of the token. */
  private value: string | null;

  /**
   * Constructs a token with provided type and value.
   *
   * The default value for token is `unkown`, which is error type.
   * The default value for the token value is `null`.
   *
   * @param type Type of the token.
   * @param value Value of the token.
   */
  constructor(type: TokType = TokType.Unknown, value: string | null = null) {
    this.type = type;
    this.value = value;
  }

  /** Returns type of the token */
  public getType(): TokType {
    return this.type;
  }

  /** Returns value of the token. */
  public getValue(): string {
    if (this.value === null) {
      throw new TypeError('Unexpected value access.');
    }
    return this.value;
  }

  /** Return `true` if token if of known type, `false` otherwise. */
  public isValid(): boolean {
    return this.type !== TokType.Unknown;
  }
}

/**
 * Regular expression lexer.
 */
export class Lexer {
  /** Source buffer that is currently being lexed. */
  private buff: string;
  /** Next token to be lexed. */
  private nextTok: Token;

  /**
   * Constructs basic lexer with provided source buffer.
   * @param buff Source buffer to be lexed.
   */
  constructor(buff: string) {
    this.buff = buff;
    this.nextTok = new Token();
    this.lexImpl();
  }

  /** Returns a next lexed token. */
  public lex(): Token {
    const tok = this.nextTok;
    if (tok.getType() !== TokType.Eof) {
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

  /**
   * Creates a new token of provided type and sets it as a next token.
   * @param type A type of the new token.
   * @param value Value of the new token.
   */
  private formToken(type: TokType, value: string | null = null) {
    this.nextTok = new Token(type, value);
  }

  /**
   * Actualy perform lexing of the next token.
   */
  private lexImpl() {
    if (this.nextTok.getType() === TokType.Eof) {
      throw new Error('Lexing past EOF.');
    }

    // Perform lexing
    while (true) {
      // Check for EOF
      if (this.buff.length === 0) {
        return this.formToken(TokType.Eof);
      }

      // Get first character and slice the internal buffer
      const char = this.buff[0];
      this.buff = this.buff.slice(1, this.buff.length);

      // Perform lexing
      switch (char) {
      case ' ':
      case '\t':
      case '\r':
      case '\n':
        // Ignore whitespace
        break;

      case '.':
        return this.formToken(TokType.Dot);
      case '+':
        return this.formToken(TokType.Plus);
      case '*':
        return this.formToken(TokType.Asterisk);
      case '(':
        return this.formToken(TokType.L_Paren);
      case ')':
        return this.formToken(TokType.R_Paren);

      case 'ε':
        return this.formToken(TokType.Epsilon);
      case '∅':
        return this.formToken(TokType.EmptyString);

      // Symbol
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
      case 'a': case 'b': case 'c': case 'd': case 'e':
      case 'f': case 'g': case 'h': case 'i': case 'j':
      case 'k': case 'l': case 'm': case 'n': case 'o':
      case 'p': case 'q': case 'r': case 's': case 't':
      case 'u': case 'v': case 'w': case 'x': case 'y':
      case 'z':
      case 'A': case 'B': case 'C': case 'D': case 'E':
      case 'F': case 'G': case 'H': case 'I': case 'J':
      case 'K': case 'L': case 'M': case 'N': case 'O':
      case 'P': case 'Q': case 'R': case 'S': case 'T':
      case 'U': case 'V': case 'W': case 'X': case 'Y':
      case 'Z': case '_':
        return this.formToken(TokType.Char, char);

      // Error
      default:
        return this.formToken(TokType.Unknown, char);
      }
    }
  }
}
