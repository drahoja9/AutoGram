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
export class FA_StatesEmpty extends FiniteAutomatonValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, FA_StatesEmpty.prototype);
  }
  public getMessage() : string {
    return "Finite automaton must have at least one state.";
  }
}

/** Exception thrown when automaton has empty initial states array. Derived from AutomatonValidationError. */
export class FA_InitialStatesEmpty extends FiniteAutomatonValidationError {
  constructor(){
    super();
    Object.setPrototypeOf(this, FA_InitialStatesEmpty.prototype);
  }
  public getMessage() : string {
    return "Finite automaton must have at least one initial state.";
  }
}

/** Exception thrown when automaton has state that is an empty string. Derived from AutomatonValidationError. */
export class FA_StateZeroLength extends FiniteAutomatonValidationError {
  constructor(){
    super();
    Object.setPrototypeOf(this, FA_StateZeroLength.prototype);
  }
  public getMessage() : string {
    return "States must consist of at last one character.";
  }
}

/** Exception thrown when automaton states of input alphabet symbol consist of not allowed symbols. Derived from AutomatonValidationError. 
 * Constructor params:
 * - where: if it's problem in states or in input alphabet
 * - problem: the symbol that consists of not allowed symbols
*/
export class FA_NotAllowedChar extends FiniteAutomatonValidationError {
  private where: string;
  private problem: string;
  constructor(where: string, problem: string){
    super();
    Object.setPrototypeOf(this, FA_NotAllowedChar.prototype);
    this.where = where;
    this.problem = problem;
  }
  public getMessage() : string {
    return "Symbol '" + this.problem + "' in " + this.where + " does not consist of allowed characters only."; 
  }
}

/** Exception thrown when automaton input alphabet symbol is not character. Derived from AutomatonValidationError. 
 * Constructor params:
 * - problem: the symbol that is not character
*/
export class FA_AlphabetNotChar extends FiniteAutomatonValidationError {
  private problem : string;
  constructor(problem : string){
    super();
    Object.setPrototypeOf(this, FA_AlphabetNotChar.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Input alphabet symbols must be characters. Symbol '" + this.problem + "' is not character.";
  }
}

/** Exception thrown when automaton input alphabet symbols and it's states are not unique. Derived from AutomatonValidationError. 
 * Constructor params:
 * - problem: the colliding symbol
*/
export class FA_NotUniqueNames extends FiniteAutomatonValidationError {
  private problem: string;
  constructor(problem: string){
    super();
    Object.setPrototypeOf(this, FA_NotUniqueNames.prototype);
    this.problem = problem;
  }
  public getMessage() : string {
    return "Each state and input alphabet symbol must be unique. Collision in symbol '" + this.problem + "' detected.";
  }
}

/** Exception thrown when automaton initial/final state is not defined in states. Derived from AutomatonValidationError. 
 * Constructor params:
 * - which: if it's problem in inital of final states
 * - problem: the symbol that is not defined
*/
export class FA_StateNotDefined extends FiniteAutomatonValidationError {
  private which: string;
  private problem: string;
  constructor(which: string, problem: string){
    super();
    Object.setPrototypeOf(this, FA_StateNotDefined.prototype);
    this.problem = problem;
    this.which = which;
  }
  public getMessage() : string {
    return "Each " + this.which + " must be defined in states. State '" + this.problem + "' is not defined.";
  }
}

/** Exception thrown when automaton transition attributes are not defined. Derived from AutomatonValidationError. 
 * Constructor params:
 * - what: if it's source, input or target problem
 * - where: if teh symbol should have been defined in inpul alphabet or in states
 * - problem: the symbol that is not defined
 * - nullAllowed: if the value on that specific place can be null
*/
export class FA_TransitionAttributeNotDefined extends FiniteAutomatonValidationError {
  private what: string;
  private problem: string;
  private where: string;
  private nullAllowed: boolean;
  constructor(what: string, where: string, problem: string, nullAllowed: boolean){
    super();
    Object.setPrototypeOf(this, FA_TransitionAttributeNotDefined.prototype);
    this.what = what;
    this.where = where;
    this.problem = problem;
    this.nullAllowed = nullAllowed;
  }
  public getMessage() : string {
    var nullMsg : string = "";
    if ( this.nullAllowed ) {
      nullMsg = " or it must be null";
    }
    return "Transition's " + this.what + " must be defined in " + this.where + nullMsg + ". Symbol '" + this.problem + "' is not defined.";
  }
}

/** Exception thrown when automaton is not deterministic (has at least two different transitions from the same state on the same input). 
 * Derived from AutomatonValidationError. 
 * Constructor params:
 * - source: the source of the colliding transitions
 * - input: input of the colliding transitions
*/
export class FA_NotDeterministic extends FiniteAutomatonValidationError {
  private source: string;
  private input: string;
  constructor(source: string, input: string){
    super();
    Object.setPrototypeOf(this, FA_NotDeterministic.prototype);
    this.source = source;
    this.input = input;
  }
  public getMessage() : string {
    return "Automaton is not deterministic. It has more transitions from state '" + this.source + "' on input '" + this.input + "'.";
  }
}

export class FA_MultipleInitialStates extends FiniteAutomatonValidationError {
  constructor(){
    super();
    Object.setPrototypeOf(this, FA_MultipleInitialStates.prototype);
  }
  public getMessage() : string {
    return "Automaton is not deterministic. It has more initial states.";
  }
}