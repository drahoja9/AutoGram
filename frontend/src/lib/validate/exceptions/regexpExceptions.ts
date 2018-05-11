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

/** Exception thrown when regexp alphabet symbol is not character. Derived from RegexpValidationError. 
 * Constructor params:
 * - problem: the symbol that is not character
*/
export class RE_alphabetNotChar extends RegexpValidationError {
  private problem : string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RE_alphabetNotChar.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Alphabet symbols must be characters. Symbol '" + this.problem + "' is not character.";
  }
}

/** Exception thrown when regexp alphabet symbol that is not allowed symbol. Derived from RegexpValidationError. 
 * Constructor params:
 * - problem: the symbol that is not allowed
*/
export class RE_NotAllowedChar extends RegexpValidationError {
  private problem : string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RE_NotAllowedChar.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Alphabet symbol '" + this.problem + "' does not consist of allowed characters only.";
  }
}

/** Exception thrown when regexp alphabet symbols are not unique. Derived from RegexpValidationError. 
 * Constructor params:
 * - problem: the colliding symbol
*/
export class RE_NotUniqueNames extends RegexpValidationError {
  private problem : string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RE_NotUniqueNames.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Each alphabet symbol must be uniqe. Collision in symbol '" + this.problem + "' detected.";
  }
}

/** Exception thrown when regexp concatenation or alternation nodes have less than two child nodes. Derived from RegexpValidationError. 
 * Constructor params:
 * - where: if it's problem in concatenation or in alternation
*/
export class RE_NotEnoughChildNodes extends RegexpValidationError {
  private where: string;
  constructor(where: string){
    super();
    Object.setPrototypeOf(this, RE_NotEnoughChildNodes.prototype);
    this.where = where;
  }
  public getMessage() : string {
    return "Each " + this.where + " must consist of at least two child regular expressions.";
  }
}

/** Exception thrown when regexp term value is not defined in alphabet. Derived from RegexpValidationError. 
 * Constructor params:
 * - problem: the symbol that is not defined
*/
export class RE_TermNotInAlphabet extends RegexpValidationError {
  private problem : string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RE_TermNotInAlphabet.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Each term must be defined in alphabet. Term '" + this.problem + "' is not defined.";
  }
}

/** Exception thrown when regexp node type is unknown. Derived from RegexpValidationError. 
 * Constructor params:
 * - problem: the node name
*/
export class RE_UnknownNodeType extends RegexpValidationError {
  private problem : string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RE_UnknownNodeType.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Unknown node type '" + this.problem + "'.";
  }
}