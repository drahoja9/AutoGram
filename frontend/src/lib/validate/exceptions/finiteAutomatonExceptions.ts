//#region imports
import { ValidationError } from './ValidationError'
//#endregion

export class FiniteAutomatonValidationError extends ValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, FiniteAutomatonValidationError.prototype)
  }
  public getMessage() : string {
    return "Error occured during automaton validation"
  }
}

export class FA_StatesEmpty extends FiniteAutomatonValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, FA_StatesEmpty.prototype)
  }
  public getMessage() : string {
    return "Finite automaton must have at least one state"
  }
}

export class FA_InitialStatesEmpty extends FiniteAutomatonValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, FA_InitialStatesEmpty.prototype)
  }
  public getMessage() : string {
    return "Finite automaton must have at least one initial state"
  }
}

export class FA_StateZeroLength extends FiniteAutomatonValidationError {
  constructor(){
    super()
    Object.setPrototypeOf(this, FA_StateZeroLength.prototype)
  }
  public getMessage() : string {
    return "States must consist of at last one character"
  }
}

export class FA_NotAllowedChar extends FiniteAutomatonValidationError {
  private where: string
  private problem: string
  constructor(where: string, problem: string){
    super()
    Object.setPrototypeOf(this, FA_NotAllowedChar.prototype)
    this.where = where
    this.problem = problem
  }
  public getMessage() : string {
    return "Symbol '" + this.problem + "' in " + this.where + " does not consist of allowed characters only." 
  }
}

export class FA_AlphabetNotChar extends FiniteAutomatonValidationError {
  private problem : string
  constructor(problem : string){
    super()
    Object.setPrototypeOf(this, FA_AlphabetNotChar.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Input alphabet symbols must be characters. Symbol '" + this.problem + "' is not character."
  }
}

export class FA_NotUniqueNames extends FiniteAutomatonValidationError {
  private problem: string
  constructor(problem: string){
    super()
    Object.setPrototypeOf(this, FA_NotUniqueNames.prototype)
    this.problem = problem
  }
  public getMessage() : string {
    return "Each state and input alphabet symbol must be unique. Collision in case of symbol '" + this.problem + "' detected."
  }
}

export class FA_StateNotDefined extends FiniteAutomatonValidationError {
  private which: string
  private problem: string
  constructor(which: string, problem: string){
    super()
    Object.setPrototypeOf(this, FA_StateNotDefined.prototype)
    this.problem = problem
    this.which = which
  }
  public getMessage() : string {
    return "Each " + this.which + " must be defined in states. State '" + this.problem + "' is not defined."
  }
}

export class FA_TransitionAttributeNotDefined extends FiniteAutomatonValidationError {
  private what: string
  private problem: string
  private where: string
  private nullAllowed: boolean
  constructor(what: string, where: string, problem: string, nullAllowed: boolean){
    super()
    Object.setPrototypeOf(this, FA_TransitionAttributeNotDefined.prototype)
    this.what = what
    this.where = where
    this.problem = problem
    this.nullAllowed = nullAllowed
  }
  public getMessage() : string {
    var nullMsg : string = ""
    if ( this.nullAllowed ) {
      nullMsg = " or it must be null"
    }
    return "Transition's " + this.what + " must be defined in " + this.where + nullMsg + ". Symbol '" + this.problem + "' is not defined."
  }
}

export class FA_NotDeterministic extends FiniteAutomatonValidationError {
  private source: string
  private input: string
  constructor(source: string, input: string){
    super()
    Object.setPrototypeOf(this, FA_NotDeterministic.prototype)
    this.source = source
    this.input = input
  }
  public getMessage() : string {
    return "Automaton is not deterministic. It has more transitions from state '" + this.source + "' on input '" + this.input + "'."
  }
}