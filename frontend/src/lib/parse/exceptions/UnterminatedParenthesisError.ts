//#region imports
import { ParseError } from 'lib/parse/exceptions';
//#endregion

/**
 * Represetns an error that is emitted when an unterminated
 * parenthesis is encountered by the parser.
 */
export class UnterminatedParenthesisError extends ParseError {
  constructor() {
    super();
    Object.setPrototypeOf(this, UnterminatedParenthesisError.prototype);
  }

  public get description(): string {
    return 'Encountered an unterminated parenthesis `(`.';
  }
}
