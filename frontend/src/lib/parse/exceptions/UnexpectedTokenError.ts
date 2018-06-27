//#region imports
import { ParseError } from 'lib/parse/exceptions';
//#endregion

/**
 * Represents an error, that is emitted when an unexpected token
 * is encountered during parsing.
 */
export class UnexpectedTokenError extends ParseError {
  /** A token, that caused the error. */
  private token: string;

  constructor(token: string) {
    super();
    this.token = token;
    Object.setPrototypeOf(this, UnexpectedTokenError.prototype);
  }

  public get description(): string {
    return `An unexpected token \`${this.token}\` was encountered during parsing.`;
  }
}
