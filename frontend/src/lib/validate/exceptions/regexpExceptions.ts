//#region imports
import { ValidationError } from './ValidationError';
//#endregion

/** Base class for exceptions that occur during regular expression validation. Derived from ValidationException. */
export class RegexpValidationError extends ValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, RegexpValidationError.prototype);
  }

  public getMessage() : string {
    return "Error occurred during regular expression validation.";
  }

}

/** Exception thrown when regexp alphabet symbol is not character. Derived from RegexpValidationError. */
export class AlphabetNotChar extends RegexpValidationError {
  private problem : string;
  
  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not character
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, AlphabetNotChar.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Alphabet symbols must be characters. Symbol '${this.problem}' is not character.`;
  }

}

/** Exception thrown when regexp alphabet symbol that is not allowed symbol. Derived from RegexpValidationError. */
export class NotAllowedChar extends RegexpValidationError {
  private problem : string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not allowed
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, NotAllowedChar.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Alphabet symbol '${this.problem}' does not consist of allowed characters only.`;
  }

}

/** Exception thrown when regexp alphabet symbols are not unique. Derived from RegexpValidationError. */
export class NotUniqueNames extends RegexpValidationError {
  private problem : string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the colliding symbol
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, NotUniqueNames.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Each alphabet symbol must be uniqe. Collision in symbol '${this.problem}' detected.`;
  }

}

/** Exception thrown when regexp concatenation or alternation nodes have less than two child nodes. Derived from RegexpValidationError. */
export class NotEnoughChildNodes extends RegexpValidationError {
  private where: string;

  /**
   * Constructs exception object with provided attributes.
   * @param where if it's problem in concatenation or in alternation
   */
  constructor(where: string){
    super();
    Object.setPrototypeOf(this, NotEnoughChildNodes.prototype);
    this.where = where;
  }

  public getMessage() : string {
    return `Each ${this.where} must consist of at least two child regular expressions.`;
  }

}

/** Exception thrown when regexp term value is not defined in alphabet. Derived from RegexpValidationError. */
export class TermNotInAlphabet extends RegexpValidationError {
  private problem : string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not defined
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, TermNotInAlphabet.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Each term must be defined in alphabet. Term '${this.problem}' is not defined.`;
  }

}
