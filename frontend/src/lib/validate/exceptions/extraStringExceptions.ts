//#region imports
import { ValidationError } from './ValidationError';
//#endregion

/** Base class for exceptions that occur during validation of extra string parameter.*/
export class ExtraStringValidationError extends ValidationError {
  protected type: string;

  constructor(type: string) {
    super();
    Object.setPrototypeOf(this, ExtraStringValidationError.prototype);
    this.type = type;
  }

  public getMessage(): string {
    return `Error occurred during validation of ${this.type}.`;
  }
}

/** Exception thrown when second parameter of the input contains some forbidden symbols.*/
export class NotAllowedChar extends ExtraStringValidationError {
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not allowed
   */
  constructor(problem: string, type: string) {
    super(type);
    Object.setPrototypeOf(this, NotAllowedChar.prototype);
    this.problem = problem;
  }

  public getMessage(): string {
    return `Symbol '${this.problem}' in ${this.type} is not an allowed character. Try to use something else.`;
  }
}

/** Exception thrown when the second parameter is empty.*/
export class EmptyString extends ExtraStringValidationError {
  constructor(type: string) {
    super(type);
    Object.setPrototypeOf(this, EmptyString.prototype);
  }

  public getMessage(): string {
    return `${this.type.charAt(0).toUpperCase() + this.type.substr(1, this.type.length)} cannot be empty.`;
  }
}
