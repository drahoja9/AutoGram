//#region imports
import { ValidationError } from './ValidationError';
//#endregion

/** Base class for exceptions that occur during automaton validation. Derived from ValidationException. */
export class FiniteAutomatonValidationError extends ValidationError {
  
  constructor(){
    super();
    Object.setPrototypeOf(this, FiniteAutomatonValidationError.prototype);
  }

  public getMessage() : string {
    return "Error occurred during automaton validation.";
  }
  
}

/** Exception thrown when automaton has empty states array. Derived from AutomatonValidationError. */
export class StatesEmpty extends FiniteAutomatonValidationError {
  
  constructor(){
    super()
    Object.setPrototypeOf(this, StatesEmpty.prototype);
  }

  public getMessage() : string {
    return "Finite automaton must have at least one state.";
  }

}

/** Exception thrown when automaton has empty initial states array. Derived from AutomatonValidationError. */
export class InitialStatesEmpty extends FiniteAutomatonValidationError {
  
  constructor(){
    super();
    Object.setPrototypeOf(this, InitialStatesEmpty.prototype);
  }

  public getMessage() : string {
    return "Finite automaton must have at least one initial state.";
  }

}

/** Exception thrown when automaton has state that is an empty string. Derived from AutomatonValidationError. */
export class StateZeroLength extends FiniteAutomatonValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, StateZeroLength.prototype);
  }

  public getMessage() : string {
    return "States must consist of at last one character.";
  }

}

/** Exception thrown when automaton states of input alphabet symbol consist of not allowed symbols. Derived from AutomatonValidationError. */
export class NotAllowedChar extends FiniteAutomatonValidationError {
  private where: string;
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param where if it's problem in states or in input alphabet
   * @param problem the symbol that consists of not allowed symbols
   */
  constructor(where: string, problem: string){
    super();
    Object.setPrototypeOf(this, NotAllowedChar.prototype);
    this.where = where;
    this.problem = problem;
  }

  public getMessage() : string {
    return `Symbol '${this.problem}' in ${this.where} does not consist of allowed characters only.`; 
  }

}

/** Exception thrown when automaton input alphabet symbol is not character. Derived from AutomatonValidationError. */
export class AlphabetNotChar extends FiniteAutomatonValidationError {
  private problem : string;

  /**
   * Constructs exception object with provided attributes.
   * @param problem the symbol that is not character
   */
  constructor(problem : string){
    super();
    Object.setPrototypeOf(this, AlphabetNotChar.prototype);
    this.problem = problem;
  }

  public getMessage() : string {
    return `Input alphabet symbols must be characters. Symbol '${this.problem}' is not character.`;
  }

}

/** Exception thrown when automaton input alphabet symbols and it's states are not unique. Derived from AutomatonValidationError. */
export class NotUniqueNames extends FiniteAutomatonValidationError {
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
    return `Each state and input alphabet symbol must be unique. Collision in symbol '${this.problem}' detected.`;
  }

}

/** Exception thrown when automaton initial/final state is not defined in states. Derived from AutomatonValidationError. */
export class StateNotDefined extends FiniteAutomatonValidationError {
  private which: string;
  private problem: string;

  /**
   * Constructs exception object with provided attributes.
   * @param which if it's problem in inital of final states
   * @param problem the symbol that is not defined
   */
  constructor(which: string, problem: string){
    super();
    Object.setPrototypeOf(this, StateNotDefined.prototype);
    this.problem = problem;
    this.which = which;
  }

  public getMessage() : string {
    return `Each ${this.which} must be defined in states. State '${this.problem}' is not defined.`;
  }

}

/**  Exception thrown when automaton transition attributes are not defined. Derived from AutomatonValidationError. */
export class TransitionAttributeNotDefined extends FiniteAutomatonValidationError {
  private what: string;
  private problem: string;
  private where: string;
  private nullAllowed: boolean;

  /**
   * Constructs exception object with provided attributes.
   * @param what if it's source, input or target problem
   * @param where if the symbol should have been defined in inpul alphabet or in states
   * @param problem the symbol that is not defined
   * @param nullAllowed if the value on that specific place can be null
   */
  constructor(what: string, where: string, problem: string, nullAllowed: boolean){
    super();
    Object.setPrototypeOf(this, TransitionAttributeNotDefined.prototype);
    this.what = what;
    this.where = where;
    this.problem = problem;
    this.nullAllowed = nullAllowed;
  }

  public getMessage() : string {
    let nullMsg : string = "";
    if ( this.nullAllowed ) {
      nullMsg = "or it must be null";
    }
    return `Transition's ${this.what} must be defined in ${this.where} ${nullMsg}. Symbol '${this.problem}' is not defined.`;
  }

}

/** 
 * Exception thrown when automaton is not deterministic (has at least two different transitions from the same state on the same input). 
 * Derived from AutomatonValidationError. 
*/
export class NotDeterministic extends FiniteAutomatonValidationError {
  private source: string;
  private input: string;

  /**
   * Constructs exception object with provided attributes.
   * @param source the source of the colliding transitions
   * @param input input of the colliding transitions
   */
  constructor(source: string, input: string){
    super();
    Object.setPrototypeOf(this, NotDeterministic.prototype);
    this.source = source;
    this.input = input;
  }

  public getMessage() : string {
    return `Automaton is not deterministic. It has more transitions from state '${this.source}' on input '${this.input}'.`;
  }

}

/**  Exception thrown when automaton is not deterministic because of multiple initial states. Derived from AutomatonValidationError. */
export class MultipleInitialStates extends FiniteAutomatonValidationError {

  constructor(){
    super();
    Object.setPrototypeOf(this, MultipleInitialStates.prototype);
  }

  public getMessage() : string {
    return "Automaton is not deterministic. It has more initial states.";
  }

}