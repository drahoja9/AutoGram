//#region imports
import { ValidationError } from './ValidationError';
//#endregion

/** Base class for exceptions that occur during grammar validation. Derived from ValidationException. */
export class GrammarValidationError extends ValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, GrammarValidationError.prototype);
  }

  public getMessage() : string {
    return "Error occurred during grammar validation.";
  }

}

/** Exception thrown when automaton has empty non-terminal alphabet array. Derived from GrammarValidationError. */
export class NonTerminalsEmpty extends GrammarValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, NonTerminalsEmpty.prototype);
  }

  public getMessage() : string {
    return "Grammar must have at least one non-terminal symbol.";
  }

}

/** Exception thrown when automaton has non-terminal that is empty string. Derived from GrammarValidationError. */
export class NonTerminalZeroLength extends GrammarValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, NonTerminalZeroLength.prototype);
  }

  public getMessage() : string {
    return "Non-terminal symbols must consist of at least one character.";
  }

}

/** Exception thrown when grammar non-terminal or terminal symbols consist of not allowed symbols. Derived from GrammarValidationError. */
export class NotAllowedChar extends GrammarValidationError {
  private problem: string;
  private where: string;

  /**
   * Constructs exception object with provided attributes.
   * @param where if it's problem in non-terminal or terminal alphabet
   * @param problem the symbol that consists of not allowed symbols
   */
  constructor(where: string, problem: string){
    super();
    Object.setPrototypeOf(this, NotAllowedChar.prototype);
    this.problem = problem;
    this.where = where;
  }

  public getMessage() : string {
    return `Symbol '${this.problem}' in ${this.where} does not consist of allowed characters only.`;
  }

}

/** Exception thrown when grammar terminal symbol is not character. Derived from GrammarValidationError. */
export class TerminalNotChar extends GrammarValidationError {
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not character
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, TerminalNotChar.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Terminal alphabet symbols must be characters. Symbol '${this.problem}' is not character.`;
  }

}

/** Exception thrown when grammar non-terminal and terminal symbols are not unique. Derived from GrammarValidationError. */
export class NotUniqueNames extends GrammarValidationError {
  private problem: string;

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
    return `Each non-terminal and terminal symbol must be unique. Collision in symbol '${this.problem}' detected.`;
  }

}

/** Exception thrown when grammar initial symbol is not defined in non-terminal alphabet. Derived from GrammarValidationError. */
export class InitialSymbolNotDefined extends GrammarValidationError {
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not defined
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, InitialSymbolNotDefined.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Initial symbol must be defined in non-terminal alphabet. Symbol '${this.problem}' is not defined.`;
  }

}

/** Exception thrown when grammar's rule left side is not one defined non-terminal symbol. Derived from GrammarValidationError. */
export class RuleFromNotDefined extends GrammarValidationError {
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not defined
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, RuleFromNotDefined.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Left side of grammar rule must consist of one non-terminal symbol. Symbol '${this.problem}' is not defined.`;
  }

}

/** Exception thrown when grammar's rule right side is empty array. Derived from GrammarValidationError. */
export class CFGRuleToZeroLength extends GrammarValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, CFGRuleToZeroLength.prototype);
  }

  public getMessage() : string {
    return "Right side of grammar rule must consist of at least one symbol or epsilon.";
  }

}

/** Exception thrown when CFG grammar's rule right side does not consist of defined terminal and nonterminal symbols. Derived from GrammarValidationError. */
export class CFGRuleToNotDefined extends GrammarValidationError {
  private problem: string;
  private from: string;
  private to: string[];

  /**
   * Constructs exception object with provided attributes.
   * @param from rule's left side
   * @param to rule's right side represented by array of symbols
   * @param problem the symbol that is not defined
   */
  constructor(from: string, to: string[], problem: string){
    super();
    Object.setPrototypeOf(this, CFGRuleToNotDefined.prototype);
    this.problem = problem;
    this.from = from;
    this.to = to;
  }

  public getMessage() : string {
    let toStr : string = "";
    for (let symbol of this.to){
      toStr += symbol;
    }
    return `Right side of grammar rule must consist of defined non-terminal and terminal symbols. Symbol '${this.problem}' in rule '${this.from} -> ${toStr}' is not defined.`;
  }

}

/** Exception thrown when (right) regular grammar's rule right side is not valid (not defined symbols, bad structure]. Derived from GrammarValidationError. */
export class RGRuleToInvalid extends GrammarValidationError {
  private from: string;
  private to: string[];

  /**
   * Constructs exception object with provided attributes.
   * @param from rule's left side
   * @param to rule's right side represented by array of symbols
   */
  constructor(from: string, to: string[]){
    super();
    Object.setPrototypeOf(this, RGRuleToInvalid.prototype);
    this.from = from;
    this.to = to;
  }

  public getMessage() : string {
    let toStr : string = "";
    for (let symbol of this.to){
      toStr += symbol;
    }
    return `Right side of regular grammar rule must consist of either terminal or terminal and non-terminal symbol. Rule '${this.from} -> ${toStr}' is not valid.`;
  }

}

/** Exception thrown when CNF grammar's rule right side is not valid (not defined symbols, bad structure]. Derived from GrammarValidationError. */
export class CNFRuleToInvalid extends GrammarValidationError {
  private from: string;
  private to: string[];

  /**
   * Constructs exception object with provided attributes.
   * @param from rule's left side
   * @param to rule's right side represented by array of symbols
   */
  constructor(from: string, to: string[]){
    super();
    Object.setPrototypeOf(this, CNFRuleToInvalid.prototype);
    this.from = from;
    this.to = to;
  }

  public getMessage() : string {
    let toStr : string = "";
    for (let symbol of this.to){
      toStr += symbol;
    }
    return `Right side of CNF grammar rule must consist of either terminal or two non-terminal symbols. Rule '${this.from} -> ${toStr}' is not valid.`;
  }

}

/** Exception thrown when other than initial symbol can be rewritten to epsilon. Derived from GrammarValidationError. */
export class NonInitialToEpsilon extends GrammarValidationError {
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that can be rewritten to epsilon
   */
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, NonInitialToEpsilon.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Only initial symbol can be rewritten to epsilon. Symbol '${this.problem}' was not declared as initial.`;
  }

}

/**  
 * Exception thrown when initial symbol can be rewitten to epsilon and at the same time occurs on the rght side of any rule. 
 * Derived from GrammarValidationError. 
*/
export class EpsilonAndInitialOnRhs extends GrammarValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, EpsilonAndInitialOnRhs.prototype);
  }

  public getMessage() : string {
    return "If it is possible to rewrite initial symbol to epsilon, then it must not be present on the right side of any rule.";
  }

}
